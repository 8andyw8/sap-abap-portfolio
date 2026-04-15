import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const getBadgeColor = (level) => {
  if (level === "Beginner") return "text-green-500";
  if (level === "Intermediate") return "text-yellow-500";
  return "text-red-500";
};

const data = [
  {
    category: "WM",
    title: "LT06 becomes LT04 after Save",
    difficulty: "Advanced",
    impact: "Prevent warehouse process inconsistency & incorrect transaction flow",
    metrics: {
      riskReduction: "High",
      manualEffortReduced: "Yes",
      incidentsPrevented: "Recurring issue eliminated",
    },
    story: `Saat proses warehouse, user melaporkan transaksi berubah dari LT06 ke LT04 setelah save. Ini berisiko mengganggu flow operasional. Saya analisa flow SAP standard dan menemukan perubahan tcode terjadi setelah TO creation. Solusi: simpan context awal dan validasi via enhancement. Hasil: flow kembali stabil tanpa intervensi manual.`,
    before: "sy-tcode berubah otomatis ke LT04",
    after: "Original tcode berhasil dipertahankan",
    content: `IF sy-tcode = 'LT06'.\n  gv_tcode = sy-tcode.\nENDIF.`,
  },
  {
    category: "ALV",
    title: "ALV Not Refresh After Data Change",
    difficulty: "Intermediate",
    impact: "Ensure real-time data visibility for users",
    metrics: {
      performanceGain: "Real-time update",
      userEfficiency: "Improved",
    },
    story: `User bingung karena data ALV tidak berubah setelah update. Root cause: tidak ada refresh method dipanggil. Setelah implement refresh_table_display, user langsung lihat perubahan tanpa reload program.`,
    before: "Data tidak update",
    after: "ALV refresh otomatis",
    content: `CALL METHOD gr_alv->refresh_table_display.`,
  },
  {
    category: "BAPI",
    title: "BAPI Not Commit Data",
    difficulty: "Intermediate",
    impact: "Prevent data inconsistency in database",
    metrics: {
      dataIntegrity: "Secured",
      failureRate: "Reduced to 0%",
    },
    story: `BAPI berhasil dipanggil tapi data tidak tersimpan. Setelah tracing, ternyata tidak ada COMMIT. Dengan menambahkan BAPI_TRANSACTION_COMMIT, data tersimpan konsisten.`,
    before: "Data tidak tersimpan",
    after: "Data berhasil commit",
    content: `CALL FUNCTION 'BAPI_TRANSACTION_COMMIT' EXPORTING wait = 'X'.`,
  },
  {
    category: "Performance",
    title: "SELECT inside LOOP Issue",
    difficulty: "Advanced",
    impact: "Reduce runtime drastically (minutes → seconds)",
    metrics: {
      runtimeImprovement: "~90% faster",
      scalability: "Improved",
    },
    story: `Program report berjalan sangat lambat. Ditemukan SELECT di dalam LOOP. Saya refactor menggunakan JOIN/FOR ALL ENTRIES. Hasilnya runtime turun drastis.`,
    before: "Program sangat lambat",
    after: "Query optimal dengan JOIN/FAE",
    content: `Gunakan FOR ALL ENTRIES atau JOIN`,
  },
  {
    category: "IDoc",
    title: "IDoc Stuck in Status 51",
    difficulty: "Advanced",
    impact: "Restore failed integration & prevent business disruption",
    metrics: {
      incidentsResolved: "Critical",
      automation: "Restored",
    },
    story: `IDoc gagal (status 51) menyebabkan integrasi terhenti. Saya cek WE02, debug FM inbound, dan perbaiki mapping. Setelah fix, IDoc kembali auto process tanpa manual re-run.`,
    before: "IDoc error manual reprocess",
    after: "Auto processing normal",
    content: `Check WE02 + debug FM inbound`,
  },
];

// Metrics Summary
const totalCases = data.length;
const advancedCases = data.filter(d => d.difficulty === "Advanced").length;
const categories = [...new Set(data.map(d => d.category))];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <Button onClick={() => setSelected(null)}>⬅ Back</Button>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-bold mt-4">{selected.title}</h1>

          <p className={`mt-2 font-semibold ${getBadgeColor(selected.difficulty)}`}>
            {selected.difficulty}
          </p>

          <div className="mt-4 bg-white p-4 rounded-2xl shadow">
            <h3 className="font-bold">💼 Business Impact</h3>
            <p>{selected.impact}</p>
          </div>

          <div className="mt-4 bg-white p-4 rounded-2xl shadow">
            <h3 className="font-bold">📊 Impact Metrics</h3>
            <ul className="list-disc ml-6">
              {Object.entries(selected.metrics || {}).map(([k, v], i) => (
                <li key={i}><strong>{k}:</strong> {v}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 bg-blue-50 p-4 rounded-xl">
            <h3 className="font-bold">🧠 Story</h3>
            <p>{selected.story}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-xl">
              <h3 className="font-bold">❌ Before</h3>
              <p>{selected.before}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-bold">✅ After</h3>
              <p>{selected.after}</p>
            </div>
          </div>

          <pre className="bg-gray-900 text-green-400 p-4 mt-6 rounded-xl">
            {selected.content}
          </pre>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-8 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-2"
      >
        SAP ABAP Experience Hub
      </motion.h1>

      <p className="mb-6 text-gray-300">
        Real-world SAP troubleshooting portfolio with measurable impact
      </p>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white text-black">
          <CardContent className="p-4">
            <h3 className="text-sm">Total Cases</h3>
            <p className="text-2xl font-bold">{totalCases}</p>
          </CardContent>
        </Card>

        <Card className="bg-white text-black">
          <CardContent className="p-4">
            <h3 className="text-sm">Advanced Cases</h3>
            <p className="text-2xl font-bold">{advancedCases}</p>
          </CardContent>
        </Card>

        <Card className="bg-white text-black">
          <CardContent className="p-4">
            <h3 className="text-sm">Modules</h3>
            <p className="text-2xl font-bold">{categories.length}</p>
          </CardContent>
        </Card>
      </div>

      <Input
        placeholder="Search issues..."
        className="mb-6 text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }}>
            <Card className="rounded-2xl bg-white text-black shadow-xl">
              <CardContent className="p-4">
                <p className="text-xs text-gray-400">{item.category}</p>
                <h2 className="text-lg font-semibold">{item.title}</h2>

                <p className={`text-sm ${getBadgeColor(item.difficulty)}`}>
                  {item.difficulty}
                </p>

                <Button className="mt-3" onClick={() => setSelected(item)}>
                  View Case
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-white text-black p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-2">About Me</h2>
        <p>
          SAP ABAP Developer focused on solving high-impact business problems with measurable results.
        </p>
      </div>
    </div>
  );
}
