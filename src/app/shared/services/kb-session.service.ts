// session.service.ts

import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root' // This makes the service a singleton available throughout the app
})
export class KBSessionService {
    private user_loggedInId_key: string = 'ACTIVE_LOGGEDIN_ID';
    private tenantID_key: string = 'ACTIVE_KB_TENANT_ID';
    private tenantID_Name_Key: string = 'ACTIVE_KB_TENANT_NAME';
    private tenantID_role: string = 'ACTIVE_KB_TENANT_ROLE';
    private chitiDeviceName : string = 'ACTIVE_CHITI_DEVICE_NAME'


    setActiveTenantDetails(mDUserTenantID: string, mdUserTenantName: string, mDUserTenantRole: string): void {
        if (mDUserTenantID != null) {
            localStorage.setItem(this.tenantID_key, mDUserTenantID);
        }
        if (mdUserTenantName != null) {
            localStorage.setItem(this.tenantID_Name_Key, mdUserTenantName);
        }

        if (mDUserTenantRole != null) {
            localStorage.setItem(this.tenantID_role, mDUserTenantRole);
        }

    }

    setActiveUserDeatils(user_loggedInId: string) {
        if (user_loggedInId != null) {
            localStorage.setItem(this.user_loggedInId_key, user_loggedInId);
        }
    }

    getActiveTenant(): string {
        return localStorage.getItem(this.tenantID_key);
    }

    getActiveLoggedInId(): string {
        return localStorage.getItem(this.user_loggedInId_key);
    }

    clearActiveTenantID() {
        localStorage.removeItem(this.tenantID_key);
        localStorage.removeItem(this.tenantID_Name_Key);
        localStorage.removeItem(this.tenantID_role);
    }

    clearActiveLoggedInId() {
        localStorage.removeItem(this.user_loggedInId_key);
    }


    getActiveTenantName(): string {
        return localStorage.getItem(this.tenantID_Name_Key);
    }

    getActiveTenantRole(): string {
        return localStorage.getItem(this.tenantID_role);
    }

    setDeviceName(deviceName) : void{
        localStorage.setItem(this.chitiDeviceName, deviceName);          
    }

    getdeviceName(): string{
        return localStorage.getItem(this.chitiDeviceName);
    }

}
