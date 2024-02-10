module.exports = {
  printWidth: 120,
  tabWidth: 2,
  trailingComma: "all",
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  importOrder: [
    "^react(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@/lib/hooks$",
    "^@/lib/utils$",
    "^@/features/(.*)$",
    "^@/pages/(.*)$",
    "^@/config(.*)$",
    "^@/constants(.*)$",
    "^@/models(.*)$",
    "^@mui/material/styles(.*)$",
    "^@mui/material(.*)$",
    "^@mui/icons-material(.*)$",
    "^@/components(.*)$",
    "^./hooks(.*)$",
    "^./components(.*)$",
    "^[./]"
  ],
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"]
}