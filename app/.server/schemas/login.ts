import { FromSchema } from 'json-schema-to-ts';

export const loginSchema = {
  type: 'object',
  properties: {
    mbrId: {
      type: 'string',
      description: '사용자의 아이디',
    },
    password: {
      type: 'string',
      description: '사용자의 비밀번호',
    },
  },
  required: ['mbrId', 'password'],
  additionalProperties: false,
} as const;

// ✅ TypeScript 타입 생성
export type LoginPayload = FromSchema<typeof loginSchema>;
