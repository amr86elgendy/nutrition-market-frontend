import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import Hero from './hero';
import biotinImage from 'assets/biotin.png';
import promoImage from 'assets/promo.webp';
import Companies from './brands';
import BestSellerProducts from './best-seller-products';
import Categories from './categories';
import {
	Banner,
	BannerContent,
	BannerDescription,
	BannerImage,
	BannerTitle,
} from 'features/home/banner';
import {
	Advertisement,
	AdvertisementContent,
	AdvertisementDescription,
	AdvertisementFooter,
	AdvertisementImage,
	AdvertisementTitle,
} from 'features/home/advertisement';
import OurFeatures from 'features/home/our-features';
import { Button } from 'components/ui/button';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'HomePage.pageMetadata',
	});

	return {
		title: t('title'),
	};
}

export default function HomePage() {
	const t = useTranslations('HomePage');
	return (
		<section>
			<Hero />
			<Suspense fallback='Categories Loading...'>
				<Categories />
			</Suspense>
			<Banner className='border-[#cae8f0] bg-[#f0faf9]'>
				<BannerContent>
					<BannerTitle className='text-[#365486]'>
						{t('banners.title1')}
					</BannerTitle>
					<BannerDescription>{t('banners.description1')}</BannerDescription>
				</BannerContent>
				<BannerImage
					src={promoImage}
					alt='image'
					height={500}
					width={500}
				/>
			</Banner>
			<Suspense fallback='Products Loading'>
				<BestSellerProducts />
			</Suspense>

			<Suspense fallback='Companies Loading'>
				<Companies />
			</Suspense>
			<Advertisement className='bg-[#f8f4fe]'>
				<AdvertisementImage
					src={biotinImage}
					alt='image'
					width={300}
					height={300}
				/>
				<AdvertisementContent>
					<AdvertisementTitle className='text-[#593889]'>
						{t('advertisements.name1')}
					</AdvertisementTitle>
					<AdvertisementDescription>
						{t('advertisements.description1')}
					</AdvertisementDescription>
					<AdvertisementFooter>
						<Button className='bg-[#593889] hover:bg-[#593889]/90'>
							{t('buyNow')}
						</Button>

						<Button
							asChild
							variant='outline'>
							<Link href='/shop'>{t('viewAll')}</Link>
						</Button>
					</AdvertisementFooter>
				</AdvertisementContent>
			</Advertisement>
			<OurFeatures />
		</section>
	);
}
