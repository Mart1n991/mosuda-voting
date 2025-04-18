import * as Sentry from "@sentry/nextjs";

interface VoteMetrics {
  coachId: string;
  timestamp: number;
  email: string;
  ip: string;
}

const MONITORING_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const SUSPICIOUS_VOTES_THRESHOLD = 40; // Nastaviteľné podľa potreby
export const recentVotes: VoteMetrics[] = [];

export const monitorVoteActivity = (vote: VoteMetrics) => {
  // Pridaj nový hlas
  recentVotes.push(vote);

  // Vymaž staré hlasy mimo monitorovacieho okna
  const now = Date.now();
  while (recentVotes.length > 0 && recentVotes[0].timestamp < now - MONITORING_WINDOW) {
    recentVotes.shift();
  }

  // Analyzuj hlasy pre daného trénera
  const coachVotes = recentVotes.filter((v) => v.coachId === vote.coachId);

  if (coachVotes.length >= SUSPICIOUS_VOTES_THRESHOLD) {
    // Kontrola IP adries
    const uniqueIPs = new Set(coachVotes.map((v) => v.ip)).size;
    const ipRatio = uniqueIPs / coachVotes.length;

    // Kontrola emailových domén
    const emailDomains = new Set(coachVotes.map((v) => v.email.split("@")[1])).size;
    const emailRatio = emailDomains / coachVotes.length;

    if (ipRatio < 0.5 || emailRatio < 0.3) {
      // Vytvor prehľadnú správu
      const message = `🚨 Suspicious Voting Alert:
- Coach ID: ${vote.coachId}
- Total Votes: ${coachVotes.length}
- Unique IPs: ${uniqueIPs} (${(ipRatio * 100).toFixed(1)}%)
- Unique Email Domains: ${emailDomains} (${(emailRatio * 100).toFixed(1)}%)
- Time Window: ${MONITORING_WINDOW / (60 * 1000)} minutes`;

      // Odoslanie alertu do Sentry
      Sentry.captureMessage(message, {
        level: "warning",
        tags: {
          coachId: vote.coachId,
          votesCount: coachVotes.length,
          uniqueIPs,
          uniqueEmailDomains: emailDomains,
        },
        extra: {
          timeWindow: MONITORING_WINDOW / (60 * 1000) + " minutes",
          ipRatio: (ipRatio * 100).toFixed(1) + "%",
          emailRatio: (emailRatio * 100).toFixed(1) + "%",
        },
      });
    }
  }
};
