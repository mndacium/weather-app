import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MobileMenu } from "./ui";

const pages = [
  { label: "Home", href: "/" },
  { label: "Saved users", href: "/users" },
];

export function AppHeader() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack direction="row" alignItems="center" gap="2rem">
            <MobileMenu pages={pages} />
            <Stack
              direction="row"
              alignItems="center"
              gap="2rem"
              display={{ xs: "none", md: "flex" }}
            >
              {pages.map(({ label, href }) => (
                <Button key={label} href={href}>
                  <Typography variant="body1" color="#fff" fontWeight="500">
                    {label}
                  </Typography>
                </Button>
              ))}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
