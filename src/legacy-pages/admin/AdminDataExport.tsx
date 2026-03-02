import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Download, 
  Database, 
  FileJson, 
  FileSpreadsheet, 
  RefreshCw, 
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
  Loader2
} from 'lucide-react';

const TABLES = [
  { name: 'profiles', label: 'Profils utilisateurs', description: 'Informations des profils' },
  { name: 'quiz_results', label: 'Résultats Quiz', description: 'Résultats des quiz passés' },
  { name: 'user_purchases', label: 'Achats', description: 'Historique des achats' },
  { name: 'stripe_payment_details', label: 'Détails Stripe', description: 'Détails des paiements Stripe' },
  { name: 'user_roles', label: 'Rôles utilisateurs', description: 'Rôles admin/user' },
  { name: 'tickets', label: 'Tickets (unifié)', description: 'Support, Contact, Feedback' },
  { name: 'ticket_messages', label: 'Messages tickets', description: 'Messages des tickets' },
];

interface TableStats {
  [key: string]: number;
}

export default function AdminDataExport() {
  const [selectedTable, setSelectedTable] = useState<string>('profiles');
  const [tableData, setTableData] = useState<any[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [exportingAll, setExportingAll] = useState(false);
  const [exportingUsers, setExportingUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableStats, setTableStats] = useState<TableStats>({});
  const [loadingStats, setLoadingStats] = useState(true);
  
  const ROWS_PER_PAGE = 50;

  // Fetch table statistics on mount
  useEffect(() => {
    fetchTableStats();
  }, []);

  // Fetch table data when selection changes
  useEffect(() => {
    if (selectedTable) {
      fetchTableData();
    }
  }, [selectedTable, currentPage]);

  const getAuthToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
  };

  const fetchTableStats = async () => {
    setLoadingStats(true);
    try {
      const token = await getAuthToken();
      const response = await supabase.functions.invoke('admin-export', {
        body: { action: 'get_table_stats' },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.error) throw new Error(response.error.message);
      setTableStats(response.data.stats || {});
    } catch (error: any) {
      console.error('Error fetching stats:', error);
      toast.error('Erreur lors du chargement des statistiques');
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const token = await getAuthToken();
      const offset = (currentPage - 1) * ROWS_PER_PAGE;
      
      const response = await supabase.functions.invoke('admin-export', {
        body: { 
          action: 'export_table', 
          table: selectedTable,
          limit: ROWS_PER_PAGE,
          offset 
        },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.error) throw new Error(response.error.message);
      
      setTableData(response.data.data || []);
      setTotalRows(response.data.total || 0);
    } catch (error: any) {
      console.error('Error fetching table data:', error);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const exportTableAsJSON = async (tableName: string) => {
    try {
      const token = await getAuthToken();
      const response = await supabase.functions.invoke('admin-export', {
        body: { action: 'export_table', table: tableName, limit: 100000, offset: 0 },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.error) throw new Error(response.error.message);

      const blob = new Blob([JSON.stringify(response.data.data, null, 2)], { type: 'application/json' });
      downloadBlob(blob, `${tableName}_${new Date().toISOString().split('T')[0]}.json`);
      toast.success(`${tableName} exporté en JSON`);
    } catch (error: any) {
      toast.error(`Erreur export: ${error.message}`);
    }
  };

  const exportTableAsCSV = async (tableName: string) => {
    try {
      const token = await getAuthToken();
      const response = await supabase.functions.invoke('admin-export', {
        body: { action: 'export_table', table: tableName, limit: 100000, offset: 0 },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.error) throw new Error(response.error.message);

      const csv = convertToCSV(response.data.data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      downloadBlob(blob, `${tableName}_${new Date().toISOString().split('T')[0]}.csv`);
      toast.success(`${tableName} exporté en CSV`);
    } catch (error: any) {
      toast.error(`Erreur export: ${error.message}`);
    }
  };

  const exportAllTables = async (format: 'json' | 'csv') => {
    setExportingAll(true);
    try {
      const token = await getAuthToken();
      const response = await supabase.functions.invoke('admin-export', {
        body: { action: 'export_all_tables' },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.error) throw new Error(response.error.message);

      const data = response.data;
      const dateStr = new Date().toISOString().split('T')[0];

      if (format === 'json') {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        downloadBlob(blob, `qcm_civique_backup_${dateStr}.json`);
      } else {
        // For CSV, create a zip-like concatenated file with separators
        let csvContent = '';
        for (const [tableName, tableRows] of Object.entries(data.data)) {
          csvContent += `\n\n=== TABLE: ${tableName} ===\n`;
          csvContent += convertToCSV(tableRows as any[]);
        }
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        downloadBlob(blob, `qcm_civique_backup_${dateStr}.csv`);
      }

      toast.success(`Backup complet exporté en ${format.toUpperCase()}`);
    } catch (error: any) {
      toast.error(`Erreur export: ${error.message}`);
    } finally {
      setExportingAll(false);
    }
  };

  const exportAuthUsers = async (format: 'json' | 'csv') => {
    setExportingUsers(true);
    try {
      const token = await getAuthToken();
      const response = await supabase.functions.invoke('admin-export', {
        body: { action: 'export_auth_users' },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.error) throw new Error(response.error.message);

      const dateStr = new Date().toISOString().split('T')[0];
      const data = response.data.data;

      if (format === 'json') {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        downloadBlob(blob, `auth_users_${dateStr}.json`);
      } else {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        downloadBlob(blob, `auth_users_${dateStr}.csv`);
      }

      toast.success(`${data.length} utilisateurs exportés`);
    } catch (error: any) {
      toast.error(`Erreur export: ${error.message}`);
    } finally {
      setExportingUsers(false);
    }
  };

  const convertToCSV = (data: any[]): string => {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header];
        if (val === null || val === undefined) return '';
        if (typeof val === 'object') return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
        if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getColumns = () => {
    if (tableData.length === 0) return [];
    return Object.keys(tableData[0]);
  };

  const formatCellValue = (value: any): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'object') return JSON.stringify(value).substring(0, 50) + '...';
    if (typeof value === 'string' && value.length > 50) return value.substring(0, 50) + '...';
    return String(value);
  };

  const filteredData = tableData.filter(row => {
    if (!searchTerm) return true;
    return Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(totalRows / ROWS_PER_PAGE);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Data & Export</h1>
            <p className="text-muted-foreground">Explorateur de données et export complet</p>
          </div>
          <Button variant="outline" onClick={fetchTableStats} disabled={loadingStats}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loadingStats ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        </div>

        {/* Export All Section */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Export Complet
            </CardTitle>
            <CardDescription>
              Téléchargez toute la base de données ou la liste des utilisateurs auth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Database Export */}
              <div className="p-4 border rounded-lg bg-muted/30">
                <h3 className="font-semibold mb-2">Toutes les tables</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Export de {TABLES.length} tables ({Object.values(tableStats).reduce((a, b) => a + b, 0).toLocaleString()} lignes)
                </p>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => exportAllTables('json')} 
                    disabled={exportingAll}
                    className="flex-1"
                  >
                    {exportingAll ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileJson className="h-4 w-4 mr-2" />}
                    JSON
                  </Button>
                  <Button 
                    onClick={() => exportAllTables('csv')} 
                    disabled={exportingAll}
                    variant="outline"
                    className="flex-1"
                  >
                    {exportingAll ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileSpreadsheet className="h-4 w-4 mr-2" />}
                    CSV
                  </Button>
                </div>
              </div>

              {/* Auth Users Export */}
              <div className="p-4 border rounded-lg bg-muted/30">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Utilisateurs Auth
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Email, ID, date création, dernière connexion
                </p>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => exportAuthUsers('json')} 
                    disabled={exportingUsers}
                    className="flex-1"
                  >
                    {exportingUsers ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileJson className="h-4 w-4 mr-2" />}
                    JSON
                  </Button>
                  <Button 
                    onClick={() => exportAuthUsers('csv')} 
                    disabled={exportingUsers}
                    variant="outline"
                    className="flex-1"
                  >
                    {exportingUsers ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileSpreadsheet className="h-4 w-4 mr-2" />}
                    CSV
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Statistiques par table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {TABLES.map(table => (
                <div 
                  key={table.name}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTable === table.name 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => {
                    setSelectedTable(table.name);
                    setCurrentPage(1);
                  }}
                >
                  <div className="text-xs text-muted-foreground truncate">{table.label}</div>
                  <div className="text-lg font-bold">
                    {loadingStats ? '...' : (tableStats[table.name] || 0).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Table Explorer */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Explorateur de table</CardTitle>
                <CardDescription>
                  {TABLES.find(t => t.name === selectedTable)?.description}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={selectedTable} onValueChange={(val) => {
                  setSelectedTable(val);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TABLES.map(table => (
                      <SelectItem key={table.name} value={table.name}>
                        {table.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Export Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => exportTableAsJSON(selectedTable)}
                >
                  <FileJson className="h-4 w-4 mr-1" />
                  JSON
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => exportTableAsCSV(selectedTable)}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-1" />
                  CSV
                </Button>
              </div>
            </div>

            {/* Data Table */}
            <div className="border rounded-lg overflow-auto max-h-[500px]">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : filteredData.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  Aucune donnée
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      {getColumns().map(col => (
                        <TableHead key={col} className="whitespace-nowrap text-xs">
                          {col}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((row, idx) => (
                      <TableRow key={idx}>
                        {getColumns().map(col => (
                          <TableCell key={col} className="text-xs max-w-[200px] truncate">
                            {formatCellValue(row[col])}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                {totalRows > 0 && (
                  <>
                    Affichage {((currentPage - 1) * ROWS_PER_PAGE) + 1} - {Math.min(currentPage * ROWS_PER_PAGE, totalRows)} sur {totalRows.toLocaleString()}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1 || loading}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} / {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages || loading}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
