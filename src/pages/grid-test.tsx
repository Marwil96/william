import type { NextPage } from "next";
import Layout from "../components/Layout";
import TextBlock from "src/components/TextBlock";

const GridTest: NextPage = () => {
  return (
    <div className="grid grid-cols-12 gap-x-3 lg:gap-x-6 mx-6 lg:grid-rows-[min-content_1fr] py-10 gap-y-3 lg:gap-y-6 align-top">
      <img
        className="col-span-12 lg:col-start-1 lg:col-end-7 flex lg:row-start-1 lg:row-end-3 aspect-square object-cover rounded-lg"
        src="https://s3-alpha-sig.figma.com/img/80c0/edc7/f06c319f014d2c1b7cfbf6db1c9f1bd6?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R63sJunnTuDofrqMIIBe9vE0hbs7~ZVjS6ydO7IVcrj0y9HlW12i-AcNlTgw1n0tMKi7tG1T1O4DTtF2MLY5Ul19mMOLlPy7mHXGRhJmVZ9eKFdmBpLkEb1YaYV9PUc6sKJmP3AjrL0vB-CD2XjMeJ~Z4HTOKFzjeEPLwT0Atp2myvlAqCOGiXCE-QEviGM~w-FeO3MhXGMOV81xKIU-yXnfgAgl5RI1XR24B9SVY0X8ZsHd8QkLyCRusfUwSvyrIhUczFRAtXHP8umaL2SxN8-DSi4XHmhWjONC5W1gYrn4TmLn90y3fDDhz6ulBGB05x7XIBLg8WAUh~Sq5wAStQ__"
      />
      <img
        className="col-span-6 lg:col-start-7 lg:col-end-10 flex lg:row-start-1 lg:row-end-2 aspect-[3/4] object-cover rounded-lg"
        src="https://s3-alpha-sig.figma.com/img/d390/297d/0c5c8d91f5c2d297b019da57fdceb66c?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Sucbf4xhk0sZZbbjV~G8tUFdsxL3vdilZnXK9yoCBPKp6hqVicupwzfc7BXEGAXZqWYNrbPOtPO2-98~QwauigH4W~6x5DH-A7pKLXkBQoPEK4yGpQ4yiG5fPu3KXtfLeerz6okIcNGuugzgN15bnTxBfqiyFLcYpRWVbfeBuXK93106fvTZUZLGOfRn0-qCn5YFhOFBmimiPJubG2DkmYfjwPVabvf2U4PYNTsLoqz6tAWaygz0lgZoajuygo3MRKgq1OqYjZOkMNOj9BbWuiWaOvMRoxuMRLdm0oSX7HuqI5IBsJIQfUs-SMEGMHuxuumF4xdBQF3UUm9xaTFTxA__"
      />
      <img
        className="col-span-6 lg:col-start-10 lg:col-end-13 flex lg:row-start-1 lg:row-end-2 aspect-[3/4] object-cover rounded-lg"
        src="https://s3-alpha-sig.figma.com/img/ecd5/adaa/76fba58638d8923b2ca23e4bf28db1aa?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=el4jUu-rr-n5OCcSToqknhe8BqEew3E5aJHyO~m~q5EnyZSeQ~K9ytRCG1ZKcea4jgrNbM5dAGvmEXA~xsVQ4lt9zHI8daEGAQJ0ZAhtcdLNOW1dj1TBjxJoMxRQXxhRObWG-k1fvGs2ayOMDKjdloyXZV28jEBNvvNHyM5GcWFOf2UxC85sJVpETKkM39-IHvU-ORCq1DyEaq01f9KN~6-FS9ShEiwNqu8Kbw9F96h1A0ahKRrGH~gHr9XO46pixjXKx5KzdL0IGGmMPS8Uj-f2fXwsvYf0iYKfakyTTjBuWL9cx1-oJIkauKI3EGMuVaO5mlxuxlYbA~8mY8IXag__"
      />
      <h3 className="col-span-12 lg:col-start-7 lg:col-end-10 flex lg:row-start-2 lg:row-end-3">
        Description
      </h3>
      <p className="col-span-12 lg:col-start-10 lg:col-end-13 flex lg:row-start-2 lg:row-end-3">
        The New Balance 9060 channels the essence of the iconic 99X series.
        Featuring a streamlined upper that pays homage to the era of the 990,
        this sneaker exudes a classic vibe. The tongue is adorned with a logo
        inspired by the lace jewel of the original 991.{" "}
      </p>
    </div>
  );
};

export default GridTest;
