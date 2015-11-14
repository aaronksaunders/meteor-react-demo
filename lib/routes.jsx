FlowRouter.route("/", {
    name: "Home",
    action(_params) {
        renderMainLayoutWith(<Home />);
    }
});


FlowRouter.route("/login", {
    name: "Login",
    subscriptions(_params) {

    },
    action(_params) {
        renderMainLayoutWith(<UserLogin />);
    }
});

FlowRouter.route("/create-account", {
    name: "CreateAccount",
    subscriptions(_params) {

    },
    action(_params) {
        renderMainLayoutWith(<UserCreateAccount />);
    }
});



function renderMainLayoutWith(component) {
    ReactLayout.render(MainLayout, {
        header: <MainHeader />,
        content: component,
        footer: <MainFooter />
    });
}