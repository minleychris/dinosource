(ns dinosource.handler
  	(:use compojure.core)
  	(:require 	[compojure.handler :as handler]
    	    	[compojure.route :as route]))

(defroutes app-routes
  	(GET "/api" [] "api goes here")
    (route/files "/")
  	(route/not-found "Not Found"))

(def app
  	(handler/site app-routes))
