define({
	environments: [
		{ browserName: 'chrome' }
	],
	tunnel: 'SeleniumTunnel',
    
	functionalSuites: [
        'tests/functional/google-page-spec'
        ],

	reporters: [
		"Runner",
		{
			id: "lib/reporter/mat-html-reporter/mat-reporter"
		}
	],

	excludeInstrumentation: /^(?:tests|node_modules)\//
});
