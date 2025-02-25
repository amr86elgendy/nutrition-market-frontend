import { FieldValues } from 'react-hook-form';

export const getDirtyFields = <T extends FieldValues>(
	allFields: T,
	dirtyFields: Partial<Record<keyof T, any>>
): Partial<T> => {
	const changedFieldValues = Object.keys(dirtyFields).reduce(
		(acc, currentField) => {
			return {
				...acc,
				[currentField]: allFields[currentField],
			};
		},
		{} as Partial<T>
	);

	return changedFieldValues;
};
