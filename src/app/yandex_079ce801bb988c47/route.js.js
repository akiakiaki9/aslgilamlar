export async function GET() {
  return new Response(
    `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Yandex Verification</title>
    </head>
    <body>
        Verification: 079ce801bb988c47
    </body>
</html>`,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}