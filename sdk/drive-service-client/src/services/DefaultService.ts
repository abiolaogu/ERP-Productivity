/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Create a folder for a user
     * @param userId The ID of the user.
     * @param requestBody
     * @returns any Created. The folder has been successfully created.
     * @throws ApiError
     */
    public static postUsersFolders(
        userId: string,
        requestBody: {
            /**
             * The name of the folder to create.
             */
            name: string;
            /**
             * The ID of the parent folder. If not provided, the folder is created in the user's root.
             */
            parentFolderId?: string;
        },
    ): CancelablePromise<{
        folderId?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/{userId}/folders',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request. The request body is invalid.`,
                404: `Not found. The user or parent folder was not found.`,
            },
        });
    }
}
