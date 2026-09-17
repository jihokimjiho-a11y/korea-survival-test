import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteFooter from "./components/SiteFooter";
import { ThemeProvider } from "./contexts/ThemeContext";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";

function RoutedPage() {
  if (window.location.pathname === "/privacy") return <Privacy />;
  if (window.location.pathname === "/contact") return <Contact />;
  return <><Home /><SiteFooter /></>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <RoutedPage />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
