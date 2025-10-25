import { useAppSelector } from "@/hooks/redux-hooks";
import { selectAuthState } from "../state/auth-slice";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";

export function RequireAuth({
  children
}: {
  children: React.ReactNode;
}) {
  const { userId, loading } = useAppSelector(selectAuthState);
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);

  const checkAccess = useCallback(async () => {
    try {
      if (!userId) {
        // throw new AuthRequiredError();
        toast.error('Please login to continue!');
        navigate('/auth/login');
      }
    } catch (err) {
      setError(err as Error);
    }
  }, [userId]);

  useEffect(() => {
    if (loading) return;
    checkAccess();
  }, [loading, userId, checkAccess]);

  // if (loading) return <LoadingScreen />;

  if (error) {
    throw error;
  }

  if (!loading) {
    return <>{children}</>
  };

  return <></>
}