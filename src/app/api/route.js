/**
 * @file route.js
 * @description Root API endpoint providing server status and availability checks.
 */

export async function GET() {
  return Response.json(
    {
      success: true,
      message: "EidiSend Core API operational",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    },
    { status: 200 }
  );
}

