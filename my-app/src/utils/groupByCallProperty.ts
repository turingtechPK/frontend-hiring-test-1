export const groupCalls = (calls: any[], groupBy: string) => {
    if (!groupBy) return { "All Calls": calls };
  
    return calls.reduce((acc: Record<string, any[]>, call) => {
      let key = "";
  
      if (groupBy === "date") {
        key = new Date(call.created_at).toLocaleDateString();
      } else if (groupBy === "call_type" || groupBy === "from") {
        key = call[groupBy] || "Unknown";
      }
  
      if (!acc[key]) acc[key] = [];
      acc[key].push(call);
      return acc;
    }, {});
  };
  