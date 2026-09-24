import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiBarChart2,
  FiDatabase,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiPlus,
  FiSearch,
  FiSun,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { api, normalizeList } from "./api/client";
import { APP_NAME, ENABLE_AUTH, healthEndpoints, resources } from "./config/resources";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { ToastProvider, useToast } from "./context/ToastContext";
import { useAsync } from "./hooks/useAsync";
import { Button, Card, EmptyState, ErrorState, Field, Loader, Modal } from "./components/ui";

function Shell() {
  const [page, setPage] = useState(process.env.REACT_APP_DEFAULT_PAGE || "dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const { authenticated, booting, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const toast = useToast();

  if (booting) return <Loader label="Preparing your workspace..." />;
  if (ENABLE_AUTH && !authenticated) return <AuthPage />;

  const activeResource = resources.find((item) => item.key === page);

  const navigate = (next) => {
    setPage(next);
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">EC</span>
          <div>
            <strong>{APP_NAME}</strong>
            <small>API Control Center</small>
          </div>
        </div>
        <nav>
          <button className={page === "dashboard" ? "active" : ""} onClick={() => navigate("dashboard")}>
            <FiBarChart2 /> Dashboard
          </button>
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <button
                key={resource.key}
                className={page === resource.key ? "active" : ""}
                onClick={() => navigate(resource.key)}
              >
                <Icon /> {resource.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <button className="icon-btn mobile-only" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <FiMenu />
          </button>
          <div>
            <p className="eyebrow">Production frontend</p>
            <h1>{activeResource?.label || "Dashboard"}</h1>
          </div>
          <div className="topbar-actions">
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
            {ENABLE_AUTH && (
              <button
                className="icon-btn"
                onClick={async () => {
                  await logout();
                  toast.info("Signed out");
                }}
                aria-label="Sign out"
              >
                <FiLogOut />
              </button>
            )}
          </div>
        </header>

        {menuOpen && (
          <button className="scrim mobile-only" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <FiX />
          </button>
        )}

        <main>
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {page === "dashboard" ? <Dashboard onOpen={navigate} /> : <ResourcePage resource={activeResource} />}
          </motion.div>
        </main>

        <footer>
          <span>{APP_NAME}</span>
          <span>Standalone frontend. Backend stays untouched.</span>
        </footer>
      </div>
    </div>
  );
}

function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const toast = useToast();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.email.includes("@")) return setError("Enter a valid email address.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (mode === "register" && !form.name.trim()) return setError("Name is required.");

    setLoading(true);
    try {
      await (mode === "login" ? login(form) : register(form));
      toast.success(mode === "login" ? "Welcome back" : "Account created");
    } catch (err) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <Card className="auth-card">
        <div className="brand auth-brand">
          <span className="brand-mark">EC</span>
          <div>
            <strong>{APP_NAME}</strong>
            <small>Secure API workspace</small>
          </div>
        </div>
        <h1>{mode === "login" ? "Sign in" : "Create account"}</h1>
        <p>Use backend authentication to access protected dashboard features.</p>
        <form onSubmit={submit} className="stack">
          {mode === "register" && (
            <label className="field">
              <span>Name</span>
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>
          )}
          <label className="field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          </label>
          {error && <p className="form-error">{error}</p>}
          <Button disabled={loading}>{loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}</Button>
        </form>
        <button className="link-btn" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Need an account? Register" : "Already have an account? Sign in"}
        </button>
      </Card>
    </main>
  );
}

function Dashboard({ onOpen }) {
  const status = useAsync(async () => {
    for (const endpoint of healthEndpoints) {
      try {
        return { endpoint, data: await api.get(endpoint) };
      } catch {
        // Try the next common health endpoint.
      }
    }
    throw new Error("No health endpoint responded. Update healthEndpoints in src/config/resources.js.");
  }, []);

  return (
    <div className="dashboard">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Connected dashboard</p>
          <h2>Manage your backend from one polished interface.</h2>
          <p>
            Configure real backend resources once, then get consistent CRUD,
            search, forms, loading states, and notifications across the app.
          </p>
        </div>
        <div className="hero-orbit">
          <FiActivity />
        </div>
      </section>

      <div className="metrics">
        <Card><strong>{resources.length}</strong><span>Configured modules</span></Card>
        <Card><strong>{resources.filter((item) => !item.readOnly).length}</strong><span>Writable resources</span></Card>
        <Card><strong>{resources.filter((item) => item.supportsUpload).length}</strong><span>File-enabled modules</span></Card>
      </div>

      <div className="grid">
        <Card className="status-card">
          <h3>API Status</h3>
          {status.loading && <Loader label="Checking backend..." />}
          {status.error && <ErrorState message={status.error} onRetry={status.run} />}
          {status.data && (
            <div className="status-ok">
              <FiDatabase />
              <span>Backend responded at {status.data.endpoint}</span>
            </div>
          )}
        </Card>
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Card key={resource.key} className="resource-card">
              <Icon />
              <h3>{resource.label}</h3>
              <p>{resource.description}</p>
              <Button variant="ghost" onClick={() => onOpen(resource.key)}>Open module</Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ResourcePage({ resource }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("createdAt:desc");
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const params = useMemo(() => ({ page, limit: 10, search: query, sort }), [page, query, sort]);
  const list = useAsync(async () => normalizeList(await api.get(resource.path, params)), [resource.path, params]);

  if (!resource) return <EmptyState title="Unknown page" message="Select a module from the navigation." />;

  const save = async (payload) => {
    if (editing?.id || editing?._id) {
      await api.put(`${resource.path}/${editing.id || editing._id}`, payload);
      toast.success(`${resource.label} updated`);
    } else {
      await api.post(resource.path, payload);
      toast.success(`${resource.label} created`);
    }
    setEditing(null);
    list.run().catch(() => {});
  };

  const remove = async (item) => {
    if (!window.confirm("Delete this record?")) return;
    await api.delete(`${resource.path}/${item.id || item._id}`);
    toast.success("Record deleted");
    list.run().catch(() => {});
  };

  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await api.post(`${resource.path}/upload`, formData);
      toast.success("File uploaded");
      list.run().catch(() => {});
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="stack">
      <Card className="module-head">
        <div>
          <p className="eyebrow">{resource.readOnly ? "Read only" : "Full CRUD"}</p>
          <h2>{resource.label}</h2>
          <p>{resource.description}</p>
        </div>
        <div className="module-actions">
          {resource.supportsUpload && (
            <label className="btn btn-ghost">
              <FiUpload /> {uploading ? "Uploading..." : "Upload"}
              <input type="file" hidden onChange={upload} />
            </label>
          )}
          {!resource.readOnly && (
            <Button onClick={() => setEditing({})}><FiPlus /> New</Button>
          )}
        </div>
      </Card>

      <Card className="toolbar">
        <label className="search">
          <FiSearch />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${resource.label.toLowerCase()}...`} />
        </label>
        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="createdAt:desc">Newest first</option>
          <option value="createdAt:asc">Oldest first</option>
          <option value="name:asc">Name A-Z</option>
          <option value="name:desc">Name Z-A</option>
        </select>
      </Card>

      <Card>
        {list.loading && <Loader />}
        {list.error && <ErrorState message={list.error} onRetry={list.run} />}
        {!list.loading && !list.error && list.data?.items?.length === 0 && <EmptyState />}
        {!list.loading && !list.error && list.data?.items?.length > 0 && (
          <DataTable
            items={list.data.items}
            resource={resource}
            onEdit={setEditing}
            onDelete={remove}
          />
        )}
      </Card>

      <div className="pagination">
        <Button variant="ghost" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</Button>
        <span>Page {page}</span>
        <Button variant="ghost" onClick={() => setPage((value) => value + 1)}>Next</Button>
      </div>

      {editing && (
        <ResourceForm
          resource={resource}
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      )}
    </div>
  );
}

function DataTable({ items, resource, onEdit, onDelete }) {
  const keys = Array.from(
    new Set([
      ...resource.fields.map((field) => field.name),
      ...Object.keys(items[0] || {}).slice(0, 5),
    ])
  ).slice(0, 6);

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {keys.map((key) => <th key={key}>{key}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id || item._id || index}>
              {keys.map((key) => (
                <td key={key}>{formatValue(item[key])}</td>
              ))}
              <td>
                <div className="row-actions">
                  {!resource.readOnly && <button onClick={() => onEdit(item)}>Edit</button>}
                  {!resource.readOnly && <button onClick={() => onDelete(item)}>Delete</button>}
                  {resource.supportsUpload && item.url && (
                    <a href={item.url} target="_blank" rel="noreferrer">Download</a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResourceForm({ resource, initial, onClose, onSave }) {
  const [values, setValues] = useState(initial || {});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const missing = resource.fields.find((field) => field.required && !String(values[field.name] || "").trim());
    if (missing) return setError(`${missing.label} is required.`);
    setSaving(true);
    setError("");
    try {
      await onSave(values);
    } catch (err) {
      setError(err.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={`${initial?.id || initial?._id ? "Edit" : "Create"} ${resource.label}`} onClose={onClose}>
      <form onSubmit={submit} className="stack">
        {resource.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={(name, value) => setValues((current) => ({ ...current, [name]: value }))}
          />
        ))}
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </Modal>
  );
}

function formatValue(value) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Shell />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
