import { Metadata } from "next";
import Grid from "@mui/material/Grid2";
import { UserCard } from "@/components/shared";
import { User } from "@/types";

export const metadata: Metadata = {
  title: "Home",
};

const users: User[] = [
  {
    gender: "female",
    name: {
      title: "Miss",
      first: "Josefa",
      last: "Benítez",
    },
    location: {
      street: {
        number: 3341,
        name: "Calle de Atocha",
      },
      city: "Jerez de la Frontera",
      state: "Comunidad de Madrid",
      country: "Spain",
      postcode: 18498,
      coordinates: {
        latitude: "-35.9097",
        longitude: "114.4856",
      },
      timezone: {
        offset: "-7:00",
        description: "Mountain Time (US & Canada)",
      },
    },
    email: "josefa.benitez@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/women/9.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/9.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/9.jpg",
    },
  },
];

export default function Home() {
  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={12}>
        {users.map((user) => (
          <Grid key={user.email} size={{ xs: 12, md: 6, lg: 4 }}>
            <UserCard user={user} showSaveButton />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
