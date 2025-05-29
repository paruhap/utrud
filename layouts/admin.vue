<template>
    <div class="layout-wrapper">
        <AdminHeader/>
        <main class="main-content">
            <slot/>
        </main>
        <div class="footer-wrapper">
            <TheFooter/>
        </div>
    </div>
</template>

<style>
.layout-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex: 1 0 auto;
}

.footer-wrapper {
    flex-shrink: 0;
}
</style>