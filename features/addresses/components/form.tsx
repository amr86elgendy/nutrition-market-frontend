'use client';

import { Dispatch, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useTranslations } from 'next-intl';

import { Input } from 'components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from 'components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Button } from 'components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from 'components/ui/command';
import { useToast } from 'components/ui/use-toast';

import { cn } from 'lib/utils';
import { getDirtyFields } from 'lib/getDirtyValues';
import { addAddress, updateAddress } from '../apis/address';
import { getCities } from '../apis/egypt';
import { addressSchema } from '../apis/schema';
import type { TGovernorate } from '../types/egypt';
import type { TAddress } from '../types/address';

export function AddressForm({
	userFirstName,
	userLastName,
	userEmail,
	userPhoneNumber,
	governorates,
	isUserHasAddress,
	addressToEdit,
	setAddressToEdit,
	setAddressId,
	closeForm,
}: {
	userFirstName?: string;
	userLastName?: string;
	userEmail?: string;
	userPhoneNumber?: string;
	governorates: TGovernorate[];
	isUserHasAddress: boolean;
	addressToEdit?: TAddress;
	setAddressToEdit: Dispatch<React.SetStateAction<TAddress | undefined>>;
	setAddressId: Dispatch<React.SetStateAction<string>>;
	closeForm: () => void;
}) {
	const t = useTranslations('CheckoutPage');
	const [isGovMenuOpen, setIsGovMenuOpen] = useState(false);
	const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);

	const { toast } = useToast();
	const { execute: addAddressAction, isPending: isAddAddressPending } =
		useAction(addAddress, {
			onSuccess: async ({ data }) => {
				setAddressId(data?.address._id ?? '');
				closeForm();
			},
			onError: ({ error }) => {
				toast({
					variant: 'destructive',
					title: 'Server Error',
					description: error.serverError,
				});
			},
		});
	const { execute: updateAddressAction, isPending: isUpdateAddressPending } =
		useAction(updateAddress, {
			onSuccess: closeForm,
			onError: ({ error }) => {
				toast({
					variant: 'destructive',
					title: 'Server Error',
					description: error.serverError,
				});
			},
		});

	const {
		execute: getCitiesAction,
		result: { data: cities },
	} = useAction(getCities);

	const form = useForm<z.infer<typeof addressSchema>>({
		defaultValues: {
			firstName: addressToEdit?.firstName ?? userFirstName,
			lastName: addressToEdit?.lastName ?? userLastName,
			email: addressToEdit?.email ?? userEmail,
			phone: addressToEdit?.phone ?? userPhoneNumber,
			additionalPhone: addressToEdit?.additionalPhone ?? '',
			governorate: addressToEdit?.governorate ?? '',
			city: addressToEdit?.city ?? '',
			street: addressToEdit?.street ?? '',
			buildingNo: addressToEdit?.buildingNo ?? '',
			floor: addressToEdit?.floor ?? '',
		},
		resolver: zodResolver(addressSchema),
	});

	useEffect(() => {
		if (addressToEdit) {
			const gov = governorates.find(
				governorate =>
					governorate.governorate_name_en === addressToEdit.governorate
			)!;

			getCitiesAction({ govId: gov.id });
		}
	}, [addressToEdit]);

	function onSubmit(values: z.infer<typeof addressSchema>) {
		if (addressToEdit) {
			const dirtyValues = getDirtyFields(values, form.formState.dirtyFields);
			updateAddressAction({ addressId: addressToEdit._id, ...dirtyValues });
		} else {
			addAddressAction(values);
		}
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='space-y-8 p-6'>
			<Form {...form}>
				<div className='media-md:gap-4 flex w-full gap-2'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem className='flex w-full flex-col'>
								<FormLabel>{t('firstName')}</FormLabel>
								<FormControl>
									<Input
										size='sm'
										variant='outline'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem className='flex w-full flex-col'>
								<FormLabel>{t('lastName')}</FormLabel>
								<FormControl>
									<Input
										size='sm'
										variant='outline'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='flex w-full flex-col'>
							<FormLabel>{t('email')}</FormLabel>
							<FormControl className='media-md:w-[50%]'>
								<Input
									size='sm'
									variant='outline'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='media-md:gap-4 flex w-full gap-2'>
					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>{t('phone')}</FormLabel>
								<FormControl>
									<Input
										variant='outline'
										size='sm'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='additionalPhone'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>{t('additionalPhone')}</FormLabel>
								<FormControl>
									<Input
										variant='outline'
										size='sm'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='media-md:w-3/4 media-md:flex-row flex flex-col gap-4'>
					<FormField
						control={form.control}
						name='governorate'
						render={({ field }) => (
							<FormItem className='flex w-full flex-col'>
								<FormLabel>{t('governorate')}</FormLabel>
								<FormControl>
									<Popover
										open={isGovMenuOpen}
										onOpenChange={setIsGovMenuOpen}>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant='outline'
													role='combobox'
													className={cn(
														'w-full justify-between',
														!field.value && 'text-gray-100'
													)}>
													{field.value
														? governorates.find(
																governorate =>
																	governorate.governorate_name_en ===
																	field.value
															)?.governorate_name_en
														: t('select')}
													<ChevronsUpDown className='ms-2 h-4 w-4 shrink-0 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-[257px] p-0'>
											<Command>
												<CommandInput placeholder={t('searchGov')} />
												<CommandList>
													<CommandEmpty>{t('noGov')}</CommandEmpty>
													<CommandGroup>
														{governorates.map(governorate => (
															<CommandItem
																value={governorate.governorate_name_en}
																key={governorate.id}
																onSelect={value => {
																	const isSameValue =
																		form.getValues('governorate') === value;
																	const isCityHasValue = form.getValues('city');

																	if (isSameValue) {
																		return setIsGovMenuOpen(false);
																	}

																	form.setValue(
																		'governorate',
																		governorate.governorate_name_en,
																		{
																			shouldDirty: true,
																			shouldTouch: true,
																			shouldValidate: true,
																		}
																	);

																	if (isCityHasValue) {
																		form.setValue('city', '', {
																			shouldDirty: true,
																			shouldTouch: true,
																			shouldValidate: true,
																		});
																	}
																	getCitiesAction({ govId: governorate.id });
																	setIsGovMenuOpen(false);
																}}>
																<Check
																	className={cn(
																		'me-2 h-4 w-4',
																		governorate.governorate_name_en ===
																			field.value
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
																{governorate.governorate_name_en}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='city'
						render={({ field }) => {
							return (
								<FormItem className='flex w-full flex-col'>
									<FormLabel>{t('city')}</FormLabel>
									<FormControl>
										<Popover
											open={isCityMenuOpen}
											onOpenChange={setIsCityMenuOpen}>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant='outline'
														role='combobox'
														className={cn(
															'w-full justify-between',
															!field.value && 'text-gray-100'
														)}>
														{field.value
															? cities?.find(
																	city => city.city_name_en === field.value
																)?.city_name_en
															: t('select')}
														<ChevronsUpDown className='ms-2 h-4 w-4 shrink-0 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-[257px] p-0'>
												<Command>
													<CommandInput placeholder={t('searchCity')} />
													<CommandList>
														<CommandEmpty>{t('noCity')}</CommandEmpty>
														<CommandGroup>
															{cities?.map(city => (
																<CommandItem
																	value={city.city_name_en}
																	key={city.city_name_en}
																	onSelect={() => {
																		form.setValue('city', city.city_name_en, {
																			shouldDirty: true,
																			shouldTouch: true,
																			shouldValidate: true,
																		});
																		setIsCityMenuOpen(false);
																	}}>
																	<Check
																		className={cn(
																			'me-2 h-4 w-4',
																			city.city_name_en === field.value
																				? 'opacity-100'
																				: 'opacity-0'
																		)}
																	/>
																	{city.city_name_en}
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
				</div>
				<FormField
					control={form.control}
					name='street'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>{t('street')}</FormLabel>
							<FormControl>
								<Input
									size='sm'
									variant='outline'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='media-md:gap-4 flex gap-2'>
					<FormField
						control={form.control}
						name='buildingNo'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>{t('building')}</FormLabel>
								<FormControl>
									<Input
										size='sm'
										variant='outline'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='floor'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>{t('floor')}</FormLabel>
								<FormControl>
									<Input
										size='sm'
										variant='outline'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</Form>
			<div className='flex'>
				<Button
					type='submit'
					className='media-md:w-auto me-2 w-full'
					disabled={
						isAddAddressPending ||
						isUpdateAddressPending ||
						!form.formState.isDirty
					}>
					{isAddAddressPending || isUpdateAddressPending ? (
						<>
							<Loader2 className='me-2 h-4 w-4 animate-spin' />
							{t('pleaseWait')}
						</>
					) : addressToEdit ? (
						t('editAddress')
					) : (
						t('saveAddress')
					)}
				</Button>
				{isUserHasAddress && (
					<Button
						className='media-md:w-auto w-full'
						onClick={() => {
							setAddressToEdit(undefined);
							closeForm();
						}}
						variant='secondary-gray'>
						{t('cancel')}
					</Button>
				)}
			</div>
		</form>
	);
}
