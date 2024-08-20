import { ApiDocOptions } from '../interfaces/api-doc.options';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { ObjectResponse } from '../dtos/object-response.dto';
import { ListResponse } from '../dtos/list-response.dto';
import { applyDecorators } from '@nestjs/common';

export const ApiDoc = (options: ApiDocOptions) => {
  const {
    summary,
    description,
    responseModel,
    isArrayResponse = false,
    deprecated = false,
  } = options;

  const decorators = [];
  const hasObjectResponseModel = responseModel && !isArrayResponse;
  const hasListResponseModel = responseModel && isArrayResponse;
  const shouldAddModelSchema = responseModel;

  /**
   * 문서 정의 Decorator
   */
  const apiOperation = ApiOperation({
    summary,
    description,
    deprecated,
  });

  /**
   * 공통 response schema register (Wrapper)
   */
  const extraModels = [ObjectResponse, ListResponse];
  if (shouldAddModelSchema) {
    extraModels.push(responseModel);
  }

  const apiExtraModels = ApiExtraModels(...extraModels);
  decorators.push(extraModels);

  /**
   * 단일 객체 스키마 ObjectResponse
   */
  if (hasObjectResponseModel) {
    const objectResponse = ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ObjectResponse) },
          {
            required: ['row'],
            properties: {
              row: {
                $ref: getSchemaPath(responseModel),
              },
            },
          },
        ],
      },
    });
    decorators.push(objectResponse);
  }

  /**
   * 리스트 객체 스키마 ListResponse
   */
  if (hasListResponseModel) {
    const listResponse = ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ListResponse) },
          {
            required: ['rows'],
            properties: {
              rows: {
                type: 'array',
                items: { $ref: getSchemaPath(responseModel) },
              },
            },
          },
        ],
      },
    });
    decorators.push(listResponse);
  }

  return applyDecorators(...decorators);
};
