import * as mappingData from "@/utils/mappingData.js"

export function mapText(value, attribute) {
	const mapping = mappingData[`${attribute}Map`];
	return mapping ? mapping[value] || "未知" : "未知";
}