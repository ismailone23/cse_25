import { getVisitorStats, getProfileClicks, getVisitorDetails } from "@/lib/redis";
import ViewersDashboard from "@/components/viewers-dashboard";

export const dynamic = "force-dynamic";

export default async function ViewersPage() {
    const [stats, profileClicks, visitorDetails] = await Promise.all([
        getVisitorStats(),
        getProfileClicks(),
        getVisitorDetails(),
    ]);

    return (
        <ViewersDashboard
            stats={stats}
            profileClicks={profileClicks}
            visitorDetails={visitorDetails}
        />
    );
}
