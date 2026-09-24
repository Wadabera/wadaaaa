import {
  FiArchive,
  FiFileText,
  FiFolder,
  FiPackage,
  FiSettings,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export const APP_NAME =
  process.env.REACT_APP_APP_NAME || "Enterprise Console";

export const ENABLE_AUTH = process.env.REACT_APP_ENABLE_AUTH !== "false";

export const authEndpoints = {
  login: "/auth/login",
  register: "/auth/register",
  me: "/auth/me",
  logout: "/auth/logout",
};

export const healthEndpoints = ["/health", "/status", "/"];

export const resources = [
  {
    key: "users",
    label: "Users",
    path: "/users",
    icon: FiUsers,
    description: "Manage users, roles, profiles, and account status.",
    searchable: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "status", label: "Status", type: "select", options: ["active", "pending", "disabled"] },
    ],
  },
  {
    key: "products",
    label: "Products",
    path: "/products",
    icon: FiPackage,
    description: "Create and update catalog records.",
    searchable: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "price", label: "Price", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["draft", "active", "archived"] },
    ],
  },
  {
    key: "orders",
    label: "Orders",
    path: "/orders",
    icon: FiShoppingBag,
    description: "View and update order lifecycle data.",
    searchable: true,
    fields: [
      { name: "customerName", label: "Customer", type: "text", required: true },
      { name: "total", label: "Total", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["pending", "paid", "shipped", "cancelled"] },
    ],
  },
  {
    key: "files",
    label: "Files",
    path: "/files",
    icon: FiFolder,
    description: "Upload, download, and manage backend files.",
    supportsUpload: true,
    searchable: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    key: "reports",
    label: "Reports",
    path: "/reports",
    icon: FiFileText,
    description: "Browse reports and exported backend data.",
    readOnly: true,
    searchable: true,
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "status", label: "Status", type: "text" },
      { name: "createdAt", label: "Created", type: "date" },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: FiSettings,
    description: "Application configuration exposed by the backend.",
    fields: [
      { name: "key", label: "Key", type: "text", required: true },
      { name: "value", label: "Value", type: "textarea", required: true },
    ],
  },
  {
    key: "archive",
    label: "Archive",
    path: "/archive",
    icon: FiArchive,
    description: "Read archived records when supported by the backend.",
    readOnly: true,
    searchable: true,
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "type", label: "Type", type: "text" },
      { name: "archivedAt", label: "Archived", type: "date" },
    ],
  },
];
