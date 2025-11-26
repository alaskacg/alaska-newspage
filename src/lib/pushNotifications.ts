import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export const requestNotificationPermission = async () => {
  if (!Capacitor.isNativePlatform()) {
    // For PWA, use Web Push API
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // For native apps
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    return false;
  }

  await PushNotifications.register();
  return true;
};

export const setupPushNotifications = () => {
  if (!Capacitor.isNativePlatform()) {
    return setupWebPushNotifications();
  }

  // For native apps
  PushNotifications.addListener('registration', (token) => {
    console.log('Push registration success, token: ' + token.value);
    // TODO: Send token to your server to store for sending notifications
  });

  PushNotifications.addListener('registrationError', (error: any) => {
    console.error('Error on registration: ' + JSON.stringify(error));
  });

  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('Push notification received: ', notification);
  });

  PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
    console.log('Push notification action performed', notification.actionId, notification.inputValue);
  });
};

const setupWebPushNotifications = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        // You'll need to generate a VAPID key pair and add the public key here
        'YOUR_VAPID_PUBLIC_KEY'
      ),
    });

    console.log('Web Push subscription:', subscription);
    // TODO: Send subscription to your server
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
  }
};

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const sendTestNotification = async (title: string, body: string) => {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'weekly-report',
      requireInteraction: false,
    });
  }
};
