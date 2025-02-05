"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FloatingCard } from "./FloatingCard";
import { checkLearningPreferences } from "@/actions";

export const FloatingCardChecker = () => {
  const { data: session } = useSession();
  const [showFloatingCard, setShowFloatingCard] = useState(false);

  useEffect(() => {
    const checkPreferences = async () => {
      if (session?.user?.id) {
        try {
          const hasLearningStyle = await checkLearningPreferences(
            session.user.id
          );
          if (!hasLearningStyle) {
            setShowFloatingCard(true);
          }
        } catch (error) {
          console.error("Error checking learning preferences:", error);
        }
      }
    };

    checkPreferences();
  }, [session]);

  return showFloatingCard ? <FloatingCard /> : null;
};
