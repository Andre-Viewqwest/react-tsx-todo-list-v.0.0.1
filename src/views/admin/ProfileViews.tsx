import { Button, Card, PasswordInput, Select, TextInput } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

interface Region {
  code: string;
  name: string;
  regionName: string;
}

interface Province {
  code: string;
  name: string;
}

interface City {
  code: string;
  name: string;
}

interface Barangay {
  code: string;
  name: string;
}

const ProfileViews: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [barangays, setBarangays] = useState<Barangay[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedBarangay, setSelectedBarangay] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://psgc.gitlab.io/api/regions/")
      .then((response) => setRegions(response.data))
      .catch((error) => console.error("Error fetching regions:", error));
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      axios
        .get(`https://psgc.gitlab.io/api/regions/${selectedRegion}/provinces/`)
        .then((response) => setProvinces(response.data))
        .catch((error) => console.error("Error fetching provinces:", error));
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(
          `https://psgc.gitlab.io/api/provinces/${selectedProvince}/cities-municipalities/`
        )
        .then((response) => setCities(response.data))
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      axios
        .get(
          `https://psgc.gitlab.io/api/cities-municipalities/${selectedCity}/barangays/`
        )
        .then((response) => setBarangays(response.data))
        .catch((error) => console.error("Error fetching barangays:", error));
    }
  }, [selectedCity]);

  return (
    <>
      <div className="grid gap-8">
        <Card withBorder radius="md" p="md">
          <Card.Section>
            <div className="p-4">
              <h1 className="font-medium">Personal Details</h1>
            </div>

            <hr />

            <div className="p-4">
              <div className="p-4 grid md:grid-cols-4 gap-4">
                <div>
                  <h1 className="text-gray-500">First Name</h1>
                  <span>John</span>
                </div>

                <div>
                  <h1 className="text-gray-500">Middle Name</h1>
                  <span>Red</span>
                </div>

                <div>
                  <h1 className="text-gray-500">Last Name</h1>
                  <span>Doe</span>
                </div>
              </div>

              <hr />

              <div className="p-4 grid md:grid-cols-4 gap-4">
                <div>
                  <h1 className="text-gray-500">Region</h1>
                  <span>Region III</span>
                </div>

                <div>
                  <h1 className="text-gray-500">Province</h1>
                  <span>Bulacan</span>
                </div>

                <div>
                  <h1 className="text-gray-500">City/Municipality</h1>
                  <span>Norzagaray</span>
                </div>

                <div>
                  <h1 className="text-gray-500">Baranggay</h1>
                  <span>Friendship Village Resources</span>
                </div>

                <div>
                  <h1 className="text-gray-500">
                    Address 1 <br />
                    <span className="text-xs italic">
                      (House/Unit Number, Building Name, Street Name)
                    </span>
                  </h1>
                  <span>Blk1 Lot1 Ph1</span>
                </div>

                <div>
                  <h1 className="text-gray-500">
                    Address 2 <br />
                    <span className="text-xs italic">
                      (Subdivision/Village )
                    </span>
                  </h1>
                  <br />
                  <span>Blk1 Lot1 Ph1</span>
                </div>
              </div>

              <hr />

              <div className="p-4 grid md:grid-cols-4 gap-4">
                <div>
                  <h1 className="text-gray-500">Phone</h1>
                  <span>+63123456789</span>
                </div>

                <div>
                  <h1 className="text-gray-500">Email</h1>
                  <span>johndoe@gmail.com</span>
                </div>
              </div>
            </div>
          </Card.Section>
        </Card>

        <Card withBorder radius="md" p="md">
          <Card.Section>
            <div className="p-4">
              <h1 className="font-medium">Personal Details</h1>
            </div>
            <hr />
            <div className="p-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <TextInput label="First Name" required mt="md" />
                </div>
                <div>
                  <TextInput label="Middle Name" mt="md" />
                </div>
                <div>
                  <TextInput label="Last Name" mt="md" />
                </div>
              </div>

              <hr className="mt-6" />

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <Select
                    label="Region"
                    required
                    data={regions.map((region) => ({
                      value: region.code,
                      label: region.regionName + " (" + region.name + ")",
                    }))}
                    mt="md"
                    value={selectedRegion}
                    onChange={setSelectedRegion}
                  />
                </div>
                <div>
                  <Select
                    label="Province"
                    required
                    data={provinces.map((province) => ({
                      value: province.code,
                      label: province.name,
                    }))}
                    mt="md"
                    value={selectedProvince}
                    onChange={setSelectedProvince}
                  />
                </div>
                <div>
                  <Select
                    label="City/Municipalities"
                    required
                    data={cities.map((city) => ({
                      value: city.code,
                      label: city.name,
                    }))}
                    mt="md"
                    value={selectedCity}
                    onChange={setSelectedCity}
                  />
                </div>
                <div>
                  <Select
                    label="Barangay"
                    required
                    data={barangays.map((barangay) => ({
                      value: barangay.code,
                      label: barangay.name,
                    }))}
                    mt="md"
                    value={selectedBarangay}
                    onChange={setSelectedBarangay}
                  />
                </div>
                <div>
                  <TextInput label="Address 1" required mt="md" />
                  <span className="text-xs italic">
                    (House/Unit Number, Building Name, Street Name)
                  </span>
                </div>
                <div>
                  <TextInput label="Address 2" required mt="md" />
                  <span className="text-xs italic">(Subdivision/Village)</span>
                </div>
              </div>

              <hr className="mt-6" />

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <TextInput
                    label="Email"
                    placeholder="example@g.com"
                    required
                    mt="md"
                  />
                </div>
                <div>
                  <TextInput
                    label="Phone"
                    placeholder="09123456789"
                    required
                    mt="md"
                  />
                </div>
              </div>

              <div>
                <Button mt="xl" type="submit">
                  Update
                </Button>
              </div>
            </div>
          </Card.Section>
        </Card>

        <Card withBorder radius="md" p="md">
          <Card.Section>
            <div className="p-4">
              <h1 className="font-medium">Change Email</h1>
            </div>

            <hr />

            <div className="p-4">
              {/* <form onSubmit={form.onSubmit(handleSubmit)}> */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <TextInput
                    label="New Email"
                    placeholder="example@g.com"
                    required
                    mt="md"
                    // {...form.getInputProps("email")}
                  />
                </div>

                <div>
                  <PasswordInput
                    label="Current Password"
                    placeholder="Current password"
                    required
                    mt="md"
                    // {...form.getInputProps("currentPassword")}
                  />
                </div>
              </div>

              <div>
                <Button mt="xl" type="submit">
                  Update
                </Button>
              </div>
              {/* </form> */}
            </div>
          </Card.Section>
        </Card>

        <Card withBorder radius="md" p="md">
          <Card.Section>
            <div className="p-4">
              <h1 className="font-medium">Change Password</h1>
            </div>

            <hr />

            <div className="p-4">
              {/* <form onSubmit={form.onSubmit(handleSubmit)}> */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <PasswordInput
                    label="Current Password"
                    placeholder="Current password"
                    required
                    mt="md"
                    // {...form.getInputProps("currentPassword")}
                  />
                </div>

                <div>
                  <PasswordInput
                    label="New Password"
                    placeholder="New password"
                    required
                    mt="md"
                    // {...form.getInputProps("password")}
                  />
                </div>

                <div>
                  <PasswordInput
                    label="Confirm New Password"
                    placeholder="New password"
                    required
                    mt="md"
                    // {...form.getInputProps("password")}
                  />
                </div>
              </div>

              <div>
                <Button mt="xl" type="submit">
                  Update
                </Button>
              </div>
              {/* </form> */}
            </div>
          </Card.Section>
        </Card>
      </div>
    </>
  );
};

export default ProfileViews;
