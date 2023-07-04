/* eslint-disable react/prop-types */
import { cn } from "@/utils";
import { NavLink } from "react-router-dom";

export const MainNav = ({ className, links }) => (
  <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
    {links.map((link) => (
      <NavLink
        end
        key={link.href}
        to={link.href}
        className={({ isActive }) =>
          isActive
            ? "text-sm font-medium transition-colors hover:text-primary"
            : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        }
      >
        {link.name}
      </NavLink>
    ))}
  </nav>
);
