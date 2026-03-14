import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Nav } from "./components/header/Nav";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Container maxWidth="lg" className="py-10">
          <Nav />
        </Container>
      </div>
    </ThemeProvider>
  );
}
