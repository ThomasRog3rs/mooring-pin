/* tslint:disable */
/* eslint-disable */
/**
 * AquaTrail_Data
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { GeoJsonFeature } from './GeoJsonFeature';
import {
    GeoJsonFeatureFromJSON,
    GeoJsonFeatureFromJSONTyped,
    GeoJsonFeatureToJSON,
    GeoJsonFeatureToJSONTyped,
} from './GeoJsonFeature';

/**
 * 
 * @export
 * @interface GeoJsonModel
 */
export interface GeoJsonModel {
    /**
     * 
     * @type {string}
     * @memberof GeoJsonModel
     */
    type?: string | null;
    /**
     * 
     * @type {Array<GeoJsonFeature>}
     * @memberof GeoJsonModel
     */
    features?: Array<GeoJsonFeature> | null;
}

/**
 * Check if a given object implements the GeoJsonModel interface.
 */
export function instanceOfGeoJsonModel(value: object): value is GeoJsonModel {
    return true;
}

export function GeoJsonModelFromJSON(json: any): GeoJsonModel {
    return GeoJsonModelFromJSONTyped(json, false);
}

export function GeoJsonModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): GeoJsonModel {
    if (json == null) {
        return json;
    }
    return {
        
        'type': json['type'] == null ? undefined : json['type'],
        'features': json['features'] == null ? undefined : ((json['features'] as Array<any>).map(GeoJsonFeatureFromJSON)),
    };
}

export function GeoJsonModelToJSON(json: any): GeoJsonModel {
    return GeoJsonModelToJSONTyped(json, false);
}

export function GeoJsonModelToJSONTyped(value?: GeoJsonModel | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'type': value['type'],
        'features': value['features'] == null ? undefined : ((value['features'] as Array<any>).map(GeoJsonFeatureToJSON)),
    };
}
