<script>
    import "../app.postcss";
    import NavBar from "$lib/components/NavBar.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<div class="
    flex 
    flex-col 
    justify-between 
    min-h-screen 
    min-w-[270px]
    vp-dyn
">
    <div>
        <header>
            <NavBar />
        </header>
        <main class="max-w-7xl mx-auto my-4">
            <slot />  
        </main>
    </div>
    <Footer />
</div>