import * as React from "react"
import ThemeSettings from "../../data/settings/ThemeSettings"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

export interface IConfiguredBootswatchOverrideProps {
  labelText: string
  startingThemeName: string
}

export default function ConfiguredBootswatchOverride(props: IConfiguredBootswatchOverrideProps) {
  // Theme Settings
  const data = useStaticQuery(graphql`
    query BootswatchOverrideQuery {
      themeYaml {
        ...themeSettings
      }
    }
  `)
  const themeSettings = new ThemeSettings(data.themeYaml)

  const [selectedThemeName, setSelectedThemeName] = React.useState(props.startingThemeName)

  const themeCss = `${themeSettings.data.bootswatchSettings.bootswatchThemeCDNLocation}${selectedThemeName}/${themeSettings.data.bootswatchSettings.bootswatchThemeFilename}`

  return (
    <>
      <Helmet>
        {selectedThemeName !== "default" &&
          <link
            rel="stylesheet"
            type="text/css"
            href={themeCss}
          />}
      </Helmet>

      <div className="form-group">
        <label htmlFor="theme-select">{props.labelText}</label>
        <select className="form-control" id="theme-select" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedThemeName(e.target.value)
        }}>
          <option value="default">Default (No Theme)</option>
          <option disabled>──────────</option>
          <option value="cerulean">Cerulean - A calm blue sky</option>
          <option value="cosmo">Cosmo - An ode to Metro</option>
          <option value="cyborg">Cyborg - Jet black and electric blue</option>
          <option value="darkly">Darkly - Flatly in night mode</option>
          <option value="flatly">Flatly - Flat and modern</option>
          <option value="journal">Journal - Crisp like a new sheet of paper</option>
          <option value="litera">Litera - The medium is the message</option>
          <option value="lumen">Lumen - Light and shadow</option>
          <option value="lux">Lux - A touch of class</option>
          <option value="materia">Materia - Material is the metaphor</option>
          <option value="minty">Minty - A fresh feel</option>
          <option value="pulse">Pulse - A trace of purple</option>
          <option value="sandstone">Sandstone - A touch of warmth</option>
          <option value="simplex">Simplex - Mini and minimalist</option>
          <option value="sketchy">Sketchy - A hand-drawn look for mockups and mirth</option>
          <option value="slate">Slate - Shades of gunmetal gray</option>
          <option value="solar">Solar - A spin on Solarized</option>
          <option value="spacelab">Spacelab - Silvery and sleek</option>
          <option value="superhero">Superhero - The brave and the blue</option>
          <option value="united">United - Ubuntu orange and unique font</option>
          <option value="yeti">Yeti - A friendly foundation</option>
        </select>
      </div>
    </>
  )
}
