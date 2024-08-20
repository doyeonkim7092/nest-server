const nodeEnvs = {
  LOCAL: 'local',
  DEV: 'dev',
  PROD: 'prod',
} as const;

const NODE_ENV_ARRAY: string[] = Object.values(nodeEnvs);

export const commonConstants = {
  props: {
    nodeEnvs,
    NODE_ENV_ARRAY,
  },
  errorMessages: {},
};
