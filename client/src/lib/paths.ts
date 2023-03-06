import axios from 'axios';

import { AUTH_HEADER, INTERNAL_ENDPOINT } from '@/constants';
import { BASE_PATH } from '@/env';

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const checkGetPathsStatus = async (id: string) => {
  const status = await axios.get(`${INTERNAL_ENDPOINT}/queue-status/fetch-all-paths/${id}`, {
    headers: AUTH_HEADER,
  });
  return status.data;
};

const THREE_MINUTES_IN_MS = 1000 * 60 * 3;

export const monitorGetPathsStatus = async (id: string) => {
  let workerStatus = null;
  let millisecondsPassed = 0;
  const intervalMs = 100;

  while (workerStatus == null && millisecondsPassed < THREE_MINUTES_IN_MS) {
    const status = await checkGetPathsStatus(id);
    if (status.state === 'completed' && status.data) {
      workerStatus = status.data;
      break;
    } else if (status.state === 'failed') {
      throw new Error('Unable to generate documentation');
    }

    millisecondsPassed += intervalMs;
    await sleep(intervalMs);
  }

  return workerStatus;
};

export const getPaths = async () => {
  const {
    data: { id },
  }: { data: { id: string } } = await axios.post(
    `${INTERNAL_ENDPOINT}/all-deployments/paths`,
    { basePath: BASE_PATH },
    { headers: AUTH_HEADER }
  );
  const paths = await monitorGetPathsStatus(id);

  return paths;
};
