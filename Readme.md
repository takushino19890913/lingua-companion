# 目次
## tailwind-rnについて

## React native navigationについて
- Root Navigatorで全体を管理していて、Firebaseと連携し、user認証がされている状態でのみ、Mainページ(MainStackNavigator)を表示している。それ以外はログインページを表示。
```tsx
import React, {FC} from 'react'
import {useTailwind} from 'tailwind-rn';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { AuthStackNavigator } from './AuthStackNavigator';
import { MainStackNavigator } from './MainStackNavigator';
import { useAuthState } from '../hooks/useAuthState';

export const RootNavigator: FC = () => {
    //常にUserのログイン状態を監視する事ができる。
    const {user, isLoading} = useAuthState();
    const tailwind = useTailwind();

    if(isLoading){
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="gray" />
            </SafeAreaView>
        )
    }

    return (
        <NavigationContainer>
            {user?.uid ? <MainStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    )
}
```
- /types/types.ts内、RootStackParamListからNavigatorのタイプをImportする。
### MainStackNavigator.tsx
```tsx
import React, {FC} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/types'
import { StartScreen } from '../screens/StartScrren'

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStackNavigator:FC = () => {
    // componentでScreenのtsxを指定する。
    return (
        <Stack.Navigator>
            <Stack.Screen name="Start" component={StartScreen} />
        </Stack.Navigator>
    )
}
```
### StartScreen.tsx
```tsx
import React from 'react';
import {View, Text, Alert, SafeAreaView} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig'
import { selectUser, logout } from '../slices/userSlice';
import { IconButton } from '../components/IconButton';

export const StartScreen = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const signOut = async () => {
        try{
            await auth.signOut();
            dispatch(logout());
        } catch{
            Alert.alert("Logout error");
        }
    };
    return (
        <SafeAreaView className='flex-1 justify-center mt-5 items-center' >
            <Text>{user.email}</Text>
            <IconButton name="logout" size={20} color="blue" onPress={signOut} />
        </SafeAreaView>
    )
}
```
## Reduxでの全体State管理について
- store.tsで@reduxjs/tookitで全体のステートのReducerを設定する。
```ts
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// user以外にも全体でのState管理が必要なものに関してはここで指定。
export const store = configureStore({
    reducer:{
        user:userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
```
- 上記でimportするslicerも用意する。(./slices/userSlice)
```ts
// Redux Toolkit ライブラリから createSlice と PayloadAction 関数をインポートします。
// createSlice は、action creatorsとreducersを生成するための関数です。
// PayloadAction は、actionのペイロードを型定義するための型です。
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// 外部ファイルから User という型をインポートします。
import {User} from '../types/types';

// storeからRootState型をインポートします。これは全体のReduxのstateの型です。
import { RootState } from '../store';

// Stateという新しい型を定義します。これは、このslice内部で管理するstateの形状を示します。
type State = {
    user: User;
}

// Stateの初期状態を定義します。この初期状態は空のユーザーオブジェクトで、uidとemailは空文字列です。
const initialState: State = {
    user: {uid:'', email: ''},
};

// userSliceという名前の新しいsliceを作成します。このsliceはユーザーのログイン・ログアウトの管理を担当します。
export const userSlice = createSlice({
    name:'user', // sliceの名前を定義します。
    initialState, // sliceの初期状態を設定します。
    reducers:{ // reducersオブジェクトを定義します。ここで定義された関数がreducerとして働きます。
        // ログインのreducerを定義します。ユーザー情報をpayloadとして受け取り、state.userに設定します。
        login:(state, action:PayloadAction<User>) => {
            state.user = action.payload;
        },
        // ログアウトのreducerを定義します。state.userを初期状態に戻します。
        logout: (state) => {
            state.user = initialState.user;
        }
    }
});

// userSliceからaction creators（login, logout）をエクスポートします。これらは外部からこのsliceのstateを操作するための関数です。
export const {login, logout} = userSlice.actions;

// ユーザー情報を選択するためのセレクタを定義します。この関数はRedux全体のstateを引数に取り、このsliceのユーザー情報を返します。
export const selectUser = (state:RootState) => state.user.user;

// userSliceのreducerをデフォルトでエクスポートします。このreducerは、dispatchされたactionに基づいてstateの更新を行います。
export default userSlice.reducer;

```
- カスタムフックから呼び出す処理を記述。reducerはuseDispatch()で呼び出す。
```ts
// ReactライブラリからuseStateとuseEffectをインポートします。これらはReactのフックで、コンポーネント内部で状態管理と副作用を扱うためのものです。
import {useEffect, useState} from 'react';

// react-reduxライブラリからuseSelectorとuseDispatchフックをインポートします。これらはReduxのstateを読み取ったり、actionをdispatchするためのものです。
import {useSelector, useDispatch} from 'react-redux';

// Firebaseのauthモジュールから、onAuthStateChanged関数をインポートします。これはFirebaseのユーザー認証の状態を監視するためのものです。
import { onAuthStateChanged } from 'firebase/auth';

// 自作のfirebaseConfigからauthオブジェクトをインポートします。これはFirebaseのauthサービスを扱うためのものです。
import {auth} from '../firebaseConfig';

// userSliceから、selectUserセレクタとlogin、logoutアクションをインポートします。
import {selectUser, login, logout} from '../slices/userSlice';

// カスタムフックuseAuthStateを定義します。これはユーザー認証の状態とローディング状態を管理します。
export const useAuthState = () =>{
    const user = useSelector(selectUser);

    // Reduxのdispatch関数を取得します。これはactionをdispatchするためのものです。
    const dispatch = useDispatch();

    // ローディング状態を管理するためのローカルstateを定義します。
    const [isLoading, setIsLoading] = useState(false);

    // useEffectフックを使って、コンポーネントのマウント時に一度だけFirebaseの認証状態の監視を始めます。
    useEffect(() => {
        // FirebaseのonAuthStateChanged関数を呼び出して認証状態の監視を始めます。この関数は監視を終了するためのunsub関数を返します。
        const unsub = onAuthStateChanged(auth, (authUser) => {
            // ユーザーの認証状態が変化したときに呼ばれるコールバック関数です。
            // まず、ローディング状態に遷移します。
            setIsLoading(true);

            // authUserが存在すれば、つまりユーザーがログインしていれば、そのユーザー情報を使ってloginアクションをdispatchします。
            if(authUser){
                dispatch(
                    login({
                        uid:authUser.uid,
                        email:authUser.email!,
                    })
                )
            } else {
                dispatch(logout());
            }

            setIsLoading(false);

            // useEffectのクリーンアップ関数を定義します。これはコンポーネントのアンマウント時に呼ばれ、Firebaseの認証状態の監視を終了します。
            return ()=> {
                unsub();
            };
        })
    }, []); 
    return {
        user,
        isLoading,
    };
}

```
## 