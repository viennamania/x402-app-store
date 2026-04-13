import type { FraudFlagRecord, MissionSessionRecord } from "@repo/types";

export function scoreMissionSession(
  session: Pick<MissionSessionRecord, "id" | "proofUrl" | "deviceFingerprint">
): FraudFlagRecord | null {
  let score = 0;
  const reasons: string[] = [];

  if (!session.proofUrl) {
    score += 45;
    reasons.push("missing_proof");
  }

  if (!session.deviceFingerprint) {
    score += 20;
    reasons.push("missing_device_fingerprint");
  }

  if (score < 40) {
    return null;
  }

  return {
    id: `fraud_${session.id}`,
    userId: "pending-user-resolution",
    missionSessionId: session.id,
    severity: score >= 80 ? "critical" : score >= 60 ? "high" : "medium",
    reason: reasons.join(", "),
    score,
    createdAt: new Date().toISOString()
  };
}
