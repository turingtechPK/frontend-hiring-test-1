import { useState } from "react";
import { AppShell, createStyles, Container } from "@mantine/core";

import { Navbar } from "@/components";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 20,
    paddingBottom: 20,

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },
}));

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { classes } = useStyles();
  return (
    <AppShell padding="md" header={<Navbar />}>
      <Container className={classes.wrapper} size={1400}>
        {children}
      </Container>
    </AppShell>
  );
};

export default Layout;
