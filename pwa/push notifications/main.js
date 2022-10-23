function buildNotification(title) {
        const notifBody = `Created by Me.`;
        const notifImg = `https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80`;
        const options = {
          body: notifBody,
          icon: notifImg,
        };
        return new Notification(title, options);
}

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/sw.js').then((registration) => {
    registration.showNotification(buildNotification("Hola!!"));
  }, /*catch*/ (error) => {
    console.error(`Service worker registration failed: ${error}`);
  });
} else {
  console.error('Service workers are not supported.');
}


