"use client";

import { withAuthGuard } from "@hoc/with-auth-guard";
import { DashboardLayout } from "@layouts/dashboard";

export default withAuthGuard(DashboardLayout);
