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


import * as runtime from '../runtime';
import type {
  MarinaModel,
  MooringModel,
  ServiceModel,
} from '../models/index';
import {
    MarinaModelFromJSON,
    MarinaModelToJSON,
    MooringModelFromJSON,
    MooringModelToJSON,
    ServiceModelFromJSON,
    ServiceModelToJSON,
} from '../models/index';

export interface DataMarinaByGeojsonIdGeoJsonIdGetRequest {
    geoJsonId: number;
}

export interface DataMarinaByNameNameGetRequest {
    name: string;
}

export interface DataMarinaIdGetRequest {
    id: string;
}

export interface DataMarinasClosestGetRequest {
    userCoordinates?: string;
    numberOfMarinas?: number;
}

export interface DataMarinasSearchGetRequest {
    name?: string;
    canalName?: string;
    searchCoordinates?: string;
    userCoordinates?: string;
    searchDistance?: number;
    limit?: number;
    offset?: number;
    serviceTypes?: Array<string>;
    matchAllServices?: boolean;
}

export interface DataMarinasTypeTypeGetRequest {
    type: string;
    searchCoordinates?: string;
    userCoordinates?: string;
    searchDistance?: number;
    limit?: number;
    offset?: number;
}

export interface DataMooringByGeojsonIdGeoJsonIdGetRequest {
    geoJsonId: number;
}

export interface DataMooringsIdGetRequest {
    id: string;
}

export interface DataMooringsSearchGetRequest {
    name?: string;
    searchCoordinates?: string;
    userCoordinates?: string;
    searchDistance?: number;
    limit?: number;
    offset?: number;
    serviceTypes?: Array<string>;
    matchAllServices?: boolean;
}

export interface DataMooringsTypeTypeGetRequest {
    type: string;
    searchCoordinates?: string;
    userCoordinates?: string;
    searchDistance?: number;
    limit?: number;
    offset?: number;
}

export interface DataServiceByGeojsonIdGeoJsonIdGetRequest {
    geoJsonId: number;
}

export interface DataServicesIdGetRequest {
    id: string;
}

export interface DataServicesSearchGetRequest {
    name?: string;
    searchCoordinates?: string;
    userCoordinates?: string;
    searchDistance?: number;
    limit?: number;
    offset?: number;
    serviceTypes?: Array<string>;
}

export interface DataServicesTypeTypeGetRequest {
    type: string;
    searchCoordinates?: string;
    userCoordinates?: string;
    searchDistance?: number;
    limit?: number;
    offset?: number;
}

/**
 * 
 */
export class DataApi extends runtime.BaseAPI {

    /**
     */
    async dataCanalGetAllCanalNamesGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<string>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/canal/getAllCanalNames`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async dataCanalGetAllCanalNamesGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<string>> {
        const response = await this.dataCanalGetAllCanalNamesGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async dataMarinaByGeojsonIdGeoJsonIdGetRaw(requestParameters: DataMarinaByGeojsonIdGeoJsonIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MarinaModel>> {
        if (requestParameters['geoJsonId'] == null) {
            throw new runtime.RequiredError(
                'geoJsonId',
                'Required parameter "geoJsonId" was null or undefined when calling dataMarinaByGeojsonIdGeoJsonIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/marina/by-geojson-id/{geoJsonId}`.replace(`{${"geoJsonId"}}`, encodeURIComponent(String(requestParameters['geoJsonId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MarinaModelFromJSON(jsonValue));
    }

    /**
     */
    async dataMarinaByGeojsonIdGeoJsonIdGet(requestParameters: DataMarinaByGeojsonIdGeoJsonIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MarinaModel> {
        const response = await this.dataMarinaByGeojsonIdGeoJsonIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataMarinaByNameNameGetRaw(requestParameters: DataMarinaByNameNameGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MarinaModel>> {
        if (requestParameters['name'] == null) {
            throw new runtime.RequiredError(
                'name',
                'Required parameter "name" was null or undefined when calling dataMarinaByNameNameGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/marina/by-name/{name}`.replace(`{${"name"}}`, encodeURIComponent(String(requestParameters['name']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MarinaModelFromJSON(jsonValue));
    }

    /**
     */
    async dataMarinaByNameNameGet(requestParameters: DataMarinaByNameNameGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MarinaModel> {
        const response = await this.dataMarinaByNameNameGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataMarinaGetAllNamesGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<string>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/marina/getAllNames`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async dataMarinaGetAllNamesGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<string>> {
        const response = await this.dataMarinaGetAllNamesGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async dataMarinaIdGetRaw(requestParameters: DataMarinaIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MarinaModel>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling dataMarinaIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/marina/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MarinaModelFromJSON(jsonValue));
    }

    /**
     */
    async dataMarinaIdGet(requestParameters: DataMarinaIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MarinaModel> {
        const response = await this.dataMarinaIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataMarinasClosestGetRaw(requestParameters: DataMarinasClosestGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<MarinaModel>>> {
        const queryParameters: any = {};

        if (requestParameters['userCoordinates'] != null) {
            queryParameters['userCoordinates'] = requestParameters['userCoordinates'];
        }

        if (requestParameters['numberOfMarinas'] != null) {
            queryParameters['numberOfMarinas'] = requestParameters['numberOfMarinas'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/marinas/closest`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MarinaModelFromJSON));
    }

    /**
     */
    async dataMarinasClosestGet(requestParameters: DataMarinasClosestGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<MarinaModel>> {
        const response = await this.dataMarinasClosestGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataMarinasSearchGetRaw(requestParameters: DataMarinasSearchGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<MarinaModel>>> {
        const queryParameters: any = {};

        if (requestParameters['name'] != null) {
            queryParameters['name'] = requestParameters['name'];
        }

        if (requestParameters['canalName'] != null) {
            queryParameters['canalName'] = requestParameters['canalName'];
        }

        if (requestParameters['searchCoordinates'] != null) {
            queryParameters['searchCoordinates'] = requestParameters['searchCoordinates'];
        }

        if (requestParameters['userCoordinates'] != null) {
            queryParameters['userCoordinates'] = requestParameters['userCoordinates'];
        }

        if (requestParameters['searchDistance'] != null) {
            queryParameters['searchDistance'] = requestParameters['searchDistance'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        if (requestParameters['serviceTypes'] != null) {
            queryParameters['serviceTypes'] = requestParameters['serviceTypes'];
        }

        if (requestParameters['matchAllServices'] != null) {
            queryParameters['matchAllServices'] = requestParameters['matchAllServices'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/marinas/search`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MarinaModelFromJSON));
    }

    /**
     */
    async dataMarinasSearchGet(requestParameters: DataMarinasSearchGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<MarinaModel>> {
        const response = await this.dataMarinasSearchGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataMarinasTypeTypeGetRaw(requestParameters: DataMarinasTypeTypeGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<MarinaModel>>> {
        if (requestParameters['type'] == null) {
            throw new runtime.RequiredError(
                'type',
                'Required parameter "type" was null or undefined when calling dataMarinasTypeTypeGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['searchCoordinates'] != null) {
            queryParameters['searchCoordinates'] = requestParameters['searchCoordinates'];
        }

        if (requestParameters['userCoordinates'] != null) {
            queryParameters['userCoordinates'] = requestParameters['userCoordinates'];
        }

        if (requestParameters['searchDistance'] != null) {
            queryParameters['searchDistance'] = requestParameters['searchDistance'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/marinas/type/{type}`.replace(`{${"type"}}`, encodeURIComponent(String(requestParameters['type']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MarinaModelFromJSON));
    }

    /**
     */
    async dataMarinasTypeTypeGet(requestParameters: DataMarinasTypeTypeGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<MarinaModel>> {
        const response = await this.dataMarinasTypeTypeGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataMooringByGeojsonIdGeoJsonIdGetRaw(requestParameters: DataMooringByGeojsonIdGeoJsonIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MooringModel>> {
        if (requestParameters['geoJsonId'] == null) {
            throw new runtime.RequiredError(
                'geoJsonId',
                'Required parameter "geoJsonId" was null or undefined when calling dataMooringByGeojsonIdGeoJsonIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/mooring/by-geojson-id/{geoJsonId}`.replace(`{${"geoJsonId"}}`, encodeURIComponent(String(requestParameters['geoJsonId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MooringModelFromJSON(jsonValue));
    }

    /**
     */
    async dataMooringByGeojsonIdGeoJsonIdGet(requestParameters: DataMooringByGeojsonIdGeoJsonIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MooringModel> {
        const response = await this.dataMooringByGeojsonIdGeoJsonIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataMooringsIdGetRaw(requestParameters: DataMooringsIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MooringModel>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling dataMooringsIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/moorings/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MooringModelFromJSON(jsonValue));
    }

    /**
     */
    async dataMooringsIdGet(requestParameters: DataMooringsIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MooringModel> {
        const response = await this.dataMooringsIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataMooringsSearchGetRaw(requestParameters: DataMooringsSearchGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<MooringModel>>> {
        const queryParameters: any = {};

        if (requestParameters['name'] != null) {
            queryParameters['name'] = requestParameters['name'];
        }

        if (requestParameters['searchCoordinates'] != null) {
            queryParameters['searchCoordinates'] = requestParameters['searchCoordinates'];
        }

        if (requestParameters['userCoordinates'] != null) {
            queryParameters['userCoordinates'] = requestParameters['userCoordinates'];
        }

        if (requestParameters['searchDistance'] != null) {
            queryParameters['searchDistance'] = requestParameters['searchDistance'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        if (requestParameters['serviceTypes'] != null) {
            queryParameters['serviceTypes'] = requestParameters['serviceTypes'];
        }

        if (requestParameters['matchAllServices'] != null) {
            queryParameters['matchAllServices'] = requestParameters['matchAllServices'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/moorings/search`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MooringModelFromJSON));
    }

    /**
     */
    async dataMooringsSearchGet(requestParameters: DataMooringsSearchGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<MooringModel>> {
        const response = await this.dataMooringsSearchGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataMooringsTypeTypeGetRaw(requestParameters: DataMooringsTypeTypeGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<MooringModel>>> {
        if (requestParameters['type'] == null) {
            throw new runtime.RequiredError(
                'type',
                'Required parameter "type" was null or undefined when calling dataMooringsTypeTypeGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['searchCoordinates'] != null) {
            queryParameters['searchCoordinates'] = requestParameters['searchCoordinates'];
        }

        if (requestParameters['userCoordinates'] != null) {
            queryParameters['userCoordinates'] = requestParameters['userCoordinates'];
        }

        if (requestParameters['searchDistance'] != null) {
            queryParameters['searchDistance'] = requestParameters['searchDistance'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/moorings/type/{type}`.replace(`{${"type"}}`, encodeURIComponent(String(requestParameters['type']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MooringModelFromJSON));
    }

    /**
     */
    async dataMooringsTypeTypeGet(requestParameters: DataMooringsTypeTypeGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<MooringModel>> {
        const response = await this.dataMooringsTypeTypeGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataServiceByGeojsonIdGeoJsonIdGetRaw(requestParameters: DataServiceByGeojsonIdGeoJsonIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ServiceModel>> {
        if (requestParameters['geoJsonId'] == null) {
            throw new runtime.RequiredError(
                'geoJsonId',
                'Required parameter "geoJsonId" was null or undefined when calling dataServiceByGeojsonIdGeoJsonIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/service/by-geojson-id/{geoJsonId}`.replace(`{${"geoJsonId"}}`, encodeURIComponent(String(requestParameters['geoJsonId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ServiceModelFromJSON(jsonValue));
    }

    /**
     */
    async dataServiceByGeojsonIdGeoJsonIdGet(requestParameters: DataServiceByGeojsonIdGeoJsonIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ServiceModel> {
        const response = await this.dataServiceByGeojsonIdGeoJsonIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataServicesIdGetRaw(requestParameters: DataServicesIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ServiceModel>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling dataServicesIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/services/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ServiceModelFromJSON(jsonValue));
    }

    /**
     */
    async dataServicesIdGet(requestParameters: DataServicesIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ServiceModel> {
        const response = await this.dataServicesIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataServicesSearchGetRaw(requestParameters: DataServicesSearchGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ServiceModel>>> {
        const queryParameters: any = {};

        if (requestParameters['name'] != null) {
            queryParameters['name'] = requestParameters['name'];
        }

        if (requestParameters['searchCoordinates'] != null) {
            queryParameters['searchCoordinates'] = requestParameters['searchCoordinates'];
        }

        if (requestParameters['userCoordinates'] != null) {
            queryParameters['userCoordinates'] = requestParameters['userCoordinates'];
        }

        if (requestParameters['searchDistance'] != null) {
            queryParameters['searchDistance'] = requestParameters['searchDistance'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        if (requestParameters['serviceTypes'] != null) {
            queryParameters['serviceTypes'] = requestParameters['serviceTypes'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/services/search`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ServiceModelFromJSON));
    }

    /**
     */
    async dataServicesSearchGet(requestParameters: DataServicesSearchGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ServiceModel>> {
        const response = await this.dataServicesSearchGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async dataServicesTypeTypeGetRaw(requestParameters: DataServicesTypeTypeGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ServiceModel>>> {
        if (requestParameters['type'] == null) {
            throw new runtime.RequiredError(
                'type',
                'Required parameter "type" was null or undefined when calling dataServicesTypeTypeGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['searchCoordinates'] != null) {
            queryParameters['searchCoordinates'] = requestParameters['searchCoordinates'];
        }

        if (requestParameters['userCoordinates'] != null) {
            queryParameters['userCoordinates'] = requestParameters['userCoordinates'];
        }

        if (requestParameters['searchDistance'] != null) {
            queryParameters['searchDistance'] = requestParameters['searchDistance'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Data/services/type/{type}`.replace(`{${"type"}}`, encodeURIComponent(String(requestParameters['type']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ServiceModelFromJSON));
    }

    /**
     */
    async dataServicesTypeTypeGet(requestParameters: DataServicesTypeTypeGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ServiceModel>> {
        const response = await this.dataServicesTypeTypeGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
