import { ApiError, ActionResponse } from "@/types";
import { login, logout, getCurrentUser, signup } from "@/services";

export async function loginAction(email: string, password: string): Promise<ActionResponse> {
  if (!email || !password) {
    return {
      success: false,
      error: "Email and password are required",
    };
  }

  try {
    await login({ email, password });
    return { success: true };
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
      error: "An unexpected error occurred",
    };
  }
}

export async function signupAction(email: string, password: string, name?: string): Promise<ActionResponse> {
  if (!email || !password) {
    return {
      success: false,
      error: "Email and password are required",
    };
  }

  try {
    await signup({ email, password, name });
    return { success: true };
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
      error: "An unexpected error occurred",
    };
  }
}

export async function logoutAction(): Promise<ActionResponse> {
  try {
    await logout();
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to logout",
    };
  }
}

export async function getCurrentUserAction(): Promise<
  ActionResponse<{ user: Awaited<ReturnType<typeof getCurrentUser>> }>
> {
  try {
    const user = await getCurrentUser();
    return {
      success: true,
      data: { user },
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
      error: "Failed to fetch user",
    };
  }
}
