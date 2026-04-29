with open("src/App.tsx", "r") as f:
    content = f.read()

content = content.replace("          // <ProtectedRoute>", "          <ProtectedRoute>")
content = content.replace("          // </ProtectedRoute>", "")
content = content.replace("          <DashboardLayout />", "          <DashboardLayout />\\n          </ProtectedRoute>")

with open("src/App.tsx", "w") as f:
    f.write(content)
