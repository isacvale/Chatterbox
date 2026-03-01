let liveMessages = [];

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);

    const message = {
      id: Date.now() + Math.random(),
      text: body.text,
      user: body.user,
      type: body.type || "message", // "message" | "system"
      timestamp: Date.now(),
    };

    liveMessages.push(message);

    // keep memory small
    if (liveMessages.length > 100) {
      liveMessages.shift();
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  }

  // GET — return only recent messages
  const since = Number(event.queryStringParameters?.since || 0);

  const newMessages = liveMessages.filter((msg) => msg.timestamp > since);

  return {
    statusCode: 200,
    body: JSON.stringify(newMessages),
  };
};
