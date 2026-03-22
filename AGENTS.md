<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:workspace-overrides -->
# Workspace-specific rule overrides (hoanle0126/TaskManagement)

## G29 Override — browser_subagent ALLOWED
- **Rule G29 (global)** bans `browser_subagent`.
- **This workspace** cho phép dùng `browser_subagent` để kiểm tra UI/UX trực quan.
- Ưu tiên vẫn là `browser-mcp` tools trực tiếp khi có thể; dùng `browser_subagent` khi cần tự động hóa phức tạp hơn hoặc record video demo.
<!-- END:workspace-overrides -->
