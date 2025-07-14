import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from './app.routes';

describe('AppRoutes', () => {

    let router: Router;
    let location: Location;
  
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter(routes)],
        });
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);        
    });


    it('should navigate to /dashboard/control-flow', async () => {
        await router.navigate(['/dashboard']);
        expect(location.path()).toBe('/dashboard/control-flow');
    });

    it('should navigate to /change-detection', async () => {
        await router.navigate(['/dashboard/change-detection']);
        expect(location.path()).toBe('/dashboard/change-detection');
    });

    it('should navigate to /dashboard/defer-options', async () => {
        await router.navigate(['/dashboard/defer-options']);
        expect(location.path()).toBe('/dashboard/defer-options');
    });

    it('should navigate to /dashboard/defer-views', async () => {
        await router.navigate(['/dashboard/defer-views']);
        expect(location.path()).toBe('/dashboard/defer-views');
    });

    it('should navigate to /dashboard/user/:id', async () => {
        const userId = '123';
        await router.navigate(['/dashboard/user', userId]);
        expect(location.path()).toBe(`/dashboard/user/${userId}`);
    });

    it('should navigate to /dashboard/user-list', async () => {
        await router.navigate(['/dashboard/user-list']);
        expect(location.path()).toBe('/dashboard/user-list');
    });

    it('should navigate to /dashboard/view-transition-1', async () => {
        await router.navigate(['/dashboard/view-transition-1']);
        expect(location.path()).toBe('/dashboard/view-transition-1');
    });

    it('should navigate to /dashboard/view-transition-2', async () => {
        await router.navigate(['/dashboard/view-transition-2']);
        expect(location.path()).toBe('/dashboard/view-transition-2');
    });

    it('should navigate to /dashboard/hosts', async () => {
        await router.navigate(['/dashboard/hosts']);
        expect(location.path()).toBe('/dashboard/hosts');
    });

    it('should navigate to /dashboard/signal-store', async () => {
        await router.navigate(['/dashboard/signal-store']);
        expect(location.path()).toBe('/dashboard/signal-store');
    });

    it('should navigate to /dashboard/ng-content', async () => {
        await router.navigate(['/dashboard/ng-content']);
        expect(location.path()).toBe('/dashboard/ng-content');
    });

    it('should navigate to /dashboard/output-signals', async () => {
        await router.navigate(['/dashboard/output-signals']);
        expect(location.path()).toBe('/dashboard/output-signals');
    });

    it('should navigate to /dashboard/signals', async () => {
        await router.navigate(['/dashboard/signals']);
        expect(location.path()).toBe('/dashboard/signals');
    });
});