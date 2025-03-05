import { FromSchema } from 'json-schema-to-ts';

export const registerSchema = {
  type: 'object',
  properties: {
    operatorId: {
      type: 'string',
      description: '사용자의 아이디',
    },
    name: {
      type: 'string',
      description: '사용자의 이름',
    },
    password: {
      type: 'string',
      description: '사용자의 비밀번호',
    },
  },
  required: ['operatorId', 'name', 'password'],
  additionalProperties: false,
} as const;

// ✅ TypeScript 타입 생성
export type RegisterPayload = FromSchema<typeof registerSchema>;
