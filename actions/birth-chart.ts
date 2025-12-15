import { ApiError, ActionResponse } from "@/types";
import {
  createBirthChart,
  getBirthCharts,
  getBirthChartById,
  deleteBirthChart,
} from "@/services";
import { BirthChartCreateRequest, BirthChartResponse } from "@/types";

export async function createBirthChartAction(
  request: BirthChartCreateRequest
): Promise<ActionResponse<{ chart: BirthChartResponse }>> {
  if (!request.name || !request.birth_datetime || !request.city || !request.country) {
    return {
      success: false,
      error: "All fields are required",
    };
  }

  try {
    const chart = await createBirthChart(request);
    return {
      success: true,
      data: { chart },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: "Failed to create birth chart",
    };
  }
}

export async function getBirthChartsAction(): Promise<ActionResponse<{ charts: BirthChartResponse[] }>> {
  try {
    const charts = await getBirthCharts();
    return {
      success: true,
      data: { charts },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: "Failed to fetch birth charts",
    };
  }
}

export async function getBirthChartByIdAction(id: string): Promise<ActionResponse<{ chart: BirthChartResponse }>> {
  if (!id) {
    return {
      success: false,
      error: "Chart ID is required",
    };
  }

  try {
    const chart = await getBirthChartById(id);
    return {
      success: true,
      data: { chart },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: "Failed to fetch birth chart",
    };
  }
}

export async function deleteBirthChartAction(id: string): Promise<ActionResponse> {
  if (!id) {
    return {
      success: false,
      error: "Chart ID is required",
    };
  }

  try {
    await deleteBirthChart(id);
    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: "Failed to delete birth chart",
    };
  }
}

