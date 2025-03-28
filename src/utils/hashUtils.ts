import { v4 as uuidv4 } from "uuid";

/**
 * Genererar en komprimerad hash för delning
 * @param data Data som ska hashas
 * @returns En string-representation av hashen
 */
export const generateHash = (data: any): string => {
	// Skapa en JSON-sträng av datan
	const jsonData = JSON.stringify(data);

	// Koda strängen som base64 för att spara utrymme
	return btoa(jsonData);
};

/**
 * Avkodar en hash till originaldata
 * @param hash Hash-strängen som ska avkodas
 * @returns Avkodad data eller null om avkodning misslyckas
 */
export const decodeHash = <T>(hash: string): T | null => {
	try {
		// Avkoda base64 till original JSON-sträng
		const jsonData = atob(hash);

		// Parsa JSON till JavaScript-objekt
		return JSON.parse(jsonData) as T;
	} catch (error) {
		console.error("Failed to decode hash:", error);
		return null;
	}
};

/**
 * Genererar ett unikt ID för designen
 * @returns Ett unikt ID
 */
export const generateUniqueId = (): string => {
	return uuidv4();
};
