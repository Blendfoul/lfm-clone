import { NativeToast as Toast } from './NativeToast';
import { Platform } from 'react-native';

const isNative = typeof Platform !== 'undefined' ? Platform?.OS !== 'web' : false;

export const CustomToast = () => {
  if (isNative) {
    return null
  } else {
    return <Toast />
  }
}
