import { api } from "./api-client";
import { BirthChartCreateRequest, BirthChartResponse } from "@/types";
import { ENDPOINTS } from "@/constants";

export async function createBirthChart(request: BirthChartCreateRequest): Promise<BirthChartResponse> {
  return api.post<BirthChartResponse>(ENDPOINTS.BIRTH_CHART.BASE, request);
}

export async function getBirthCharts(): Promise<BirthChartResponse[]> {
  return api.get<BirthChartResponse[]>(ENDPOINTS.BIRTH_CHART.BASE);
}

export async function getBirthChartById(id: string, theme?: string): Promise<BirthChartResponse> {
  const endpoint = theme
    ? `${ENDPOINTS.BIRTH_CHART.BY_ID(id)}?theme=${theme}`
    : ENDPOINTS.BIRTH_CHART.BY_ID(id);
  return api.get<BirthChartResponse>(endpoint);
}

export async function deleteBirthChart(id: string): Promise<void> {
  return api.delete<void>(ENDPOINTS.BIRTH_CHART.BY_ID(id));
}
