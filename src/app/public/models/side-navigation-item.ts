export interface SideNavigationItem {
  label: string;
  icon: string;
  route?: string;
  action?: string; // 👈 se añade esta línea
}
