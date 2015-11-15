
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


FlowRouter.route("/profile", {
    name: "UserProfile",
    subscriptions(_params) {

    },
    action(_params) {

        //if not logged in the go to login page
        checkLoginStatus();

        renderMainLayoutWith(<UserProfile />);
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


function checkLoginStatus() {
    if (!Meteor.userId()) {
        FlowRouter.go('Login')
    }
}

function renderMainLayoutWith(component) {
    ReactLayout.render(MainLayout, {
        header: <MainHeader />,
        content: component,
        footer: <MainFooter />
    });
}